// ── CARRITO DE COTIZACIÓN ────────────────────────────────────
let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

function guardar() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarUI();
}

function agregarProducto(id, nombre, precio) {
  const idx = carrito.findIndex(p => p.id === id);
  if (idx >= 0) {
    carrito[idx].qty += 1;
  } else {
    carrito.push({ id, nombre, precio, qty: 1 });
  }
  guardar();
  abrirCarrito();
}

function cambiarCantidad(id, delta) {
  const idx = carrito.findIndex(p => p.id === id);
  if (idx < 0) return;
  carrito[idx].qty += delta;
  if (carrito[idx].qty <= 0) carrito.splice(idx, 1);
  guardar();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardar();
}

function actualizarUI() {
  // Badge contador
  const total = carrito.reduce((s, p) => s + p.qty, 0);
  document.querySelectorAll('.carrito-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });

  // Lista carrito
  const lista = document.getElementById('carrito-lista');
  const empty = document.getElementById('carrito-empty');
  const footer = document.getElementById('carrito-footer');
  if (!lista) return;

  if (carrito.length === 0) {
    lista.innerHTML = '';
    if (empty)  empty.style.display = 'block';
    if (footer) footer.style.display = 'none';
    return;
  }
  if (empty)  empty.style.display = 'none';
  if (footer) footer.style.display = 'block';

  lista.innerHTML = carrito.map(p => `
    <div class="flex items-center gap-3 py-3 border-b border-gray-100">
      <div class="flex-1">
        <p class="text-sm font-semibold text-gray-800">${p.nombre}</p>
        ${p.precio ? `<p class="text-xs text-gray-500">$ ${Number(p.precio).toLocaleString('es-CO')}</p>` : ''}
      </div>
      <div class="flex items-center gap-1">
        <button onclick="cambiarCantidad('${p.id}',-1)" class="w-6 h-6 rounded bg-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-300">−</button>
        <span class="w-6 text-center text-sm font-semibold">${p.qty}</span>
        <button onclick="cambiarCantidad('${p.id}',1)" class="w-6 h-6 rounded bg-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-300">+</button>
      </div>
      <button onclick="eliminarProducto('${p.id}')" class="text-red-400 hover:text-red-600 text-xs ml-1">✕</button>
    </div>
  `).join('');
}

function abrirCarrito() {
  const panel = document.getElementById('carrito-panel');
  const overlay = document.getElementById('carrito-overlay');
  if (panel) { panel.classList.remove('carrito-cerrado'); panel.classList.add('carrito-abierto'); }
  if (overlay) overlay.style.display = 'block';
}

function cerrarCarrito() {
  const panel = document.getElementById('carrito-panel');
  const overlay = document.getElementById('carrito-overlay');
  if (panel) { panel.classList.remove('carrito-abierto'); panel.classList.add('carrito-cerrado'); }
  if (overlay) overlay.style.display = 'none';
}

function solicitarWhatsApp() {
  if (carrito.length === 0) return alert('Tu carrito está vacío.');
  let msg = '🛒 *Solicitud de Cotización - UNILABOR Dotaciones*\n\n';
  carrito.forEach((p, i) => {
    msg += `${i+1}. ${p.nombre} — Cant: ${p.qty}`;
    if (p.precio) msg += ` — Ref: $${Number(p.precio).toLocaleString('es-CO')} c/u`;
    msg += '\n';
  });
  msg += '\nPor favor confirmarme disponibilidad y precio final. ¡Gracias!';
  window.open('https://wa.me/573106283321?text=' + encodeURIComponent(msg), '_blank');
}

function descargarPDF() {
  if (carrito.length === 0) return alert('Tu carrito está vacío.');
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.setTextColor(31, 56, 100);
  doc.text('UNILABOR Dotaciones', 20, 20);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('NIT 40.775.436-9 | Calle 11 9-06, Florencia Caquetá | Tel: 3106283321', 20, 28);
  doc.setFontSize(13);
  doc.setTextColor(0);
  doc.text('Resumen de Cotización', 20, 42);
  doc.setFontSize(9);
  doc.text(new Date().toLocaleDateString('es-CO'), 20, 50);

  let y = 62;
  doc.setFillColor(31, 56, 100);
  doc.rect(20, y-6, 170, 8, 'F');
  doc.setTextColor(255);
  doc.text('Producto', 22, y);
  doc.text('Cant.', 120, y);
  doc.text('Precio Ref.', 145, y);
  y += 8;

  carrito.forEach((p, i) => {
    if (i % 2 === 0) { doc.setFillColor(240,244,255); doc.rect(20, y-6, 170, 8, 'F'); }
    doc.setTextColor(50);
    doc.text(p.nombre.substring(0,50), 22, y);
    doc.text(String(p.qty), 122, y);
    doc.text(p.precio ? `$${Number(p.precio).toLocaleString('es-CO')}` : '-', 147, y);
    y += 9;
  });

  doc.setTextColor(31,56,100);
  doc.setFontSize(8);
  doc.text('Este documento es una solicitud de cotización, no una factura.', 20, y+10);
  doc.save('cotizacion-unilabor.pdf');
}

// Init
document.addEventListener('DOMContentLoaded', actualizarUI);
