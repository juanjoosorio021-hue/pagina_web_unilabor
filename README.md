# UNILABOR Dotaciones — Sitio Web

Sitio web profesional de seguridad industrial. Mobile-first, con catálogo y carrito de cotización.

## Estructura

```
unilabor-web/
├── index.html       ← Página principal
├── catalogo.html    ← Catálogo con carrito
├── contacto.html    ← Contacto y mapa
├── css/
│   └── custom.css
├── js/
│   └── carrito.js
└── README.md
```

---

## 🚀 Publicar en GitHub + Vercel (paso a paso)

### 1. Crear cuenta en GitHub
Ve a https://github.com y crea una cuenta si no tienes.

### 2. Crear repositorio
- Clic en **"New repository"**
- Nombre: `unilabor-web`
- Selecciona **Public**
- Clic en **"Create repository"**

### 3. Subir los archivos
En la página del repositorio vacío:
- Clic en **"uploading an existing file"**
- Arrastra TODOS los archivos y carpetas de esta carpeta
- Escribe un mensaje: `Sitio web inicial`
- Clic en **"Commit changes"**

### 4. Crear cuenta en Vercel
Ve a https://vercel.com y regístrate con tu cuenta de GitHub.

### 5. Importar proyecto
- En Vercel, clic en **"Add New → Project"**
- Selecciona el repositorio `unilabor-web`
- Deja todo por defecto
- Clic en **"Deploy"**

¡Listo! En ~1 minuto tendrás tu sitio en vivo con una URL como `unilabor-web.vercel.app`.

---

## ✏️ Personalizar

### Cambiar número de WhatsApp
Busca `573106283321` en todos los archivos y reemplaza por tu número.

### Agregar productos al catálogo
En `catalogo.html`, busca el array `const PRODUCTOS = [...]` y agrega líneas con este formato:
```js
{ id:'p22', cat:'cascos', emoji:'⛑️', nombre:'Nombre del producto', precio:50000 },
```
Categorías disponibles: `cascos`, `guantes`, `gafas`, `auditiva`, `calzado`, `ropa`, `señalizacion`, `barreras`

### Cambiar logo
Reemplaza el SVG inline del logo por una etiqueta `<img src="assets/logo.png">` con tu logo real.

---

## 📱 Funcionalidades
- ✅ Diseño mobile-first responsive
- ✅ Catálogo con 21 productos y filtros por categoría
- ✅ Carrito lateral con localStorage
- ✅ Botón "Solicitar Cotización por WhatsApp"
- ✅ Botón "Descargar PDF"
- ✅ Botón flotante de WhatsApp
- ✅ Página de contacto con mapa
- ✅ SEO optimizado
