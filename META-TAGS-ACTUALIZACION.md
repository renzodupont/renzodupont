# Meta Tags y Favicon - Actualización Completa

## Resumen

Se han agregado **favicon** y **meta tags de redes sociales** (Open Graph y Twitter Cards) a todas las páginas HTML del sitio.

## Cambios Realizados

### 1. Template de Generación (`generate-content.js`)

**Líneas 413-445** - Actualizado el template HTML para incluir:

```html
<!-- Favicon -->
<link rel="icon" href="/favicon.ico">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="article">
<meta property="og:url" content="[URL del artículo]">
<meta property="og:title" content="[Título del artículo]">
<meta property="og:description" content="[Descripción]">
<meta property="og:image" content="[URL de imagen destacada]">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="[URL del artículo]">
<meta name="twitter:title" content="[Título del artículo]">
<meta name="twitter:description" content="[Descripción]">
<meta name="twitter:image" content="[URL de imagen destacada]">
```

### 2. Script de Actualización Masiva

**Archivo nuevo:** `update-meta-tags.js`

Este script procesa **todos los archivos HTML** en el directorio `public/` y:
- Agrega favicon si no existe
- Agrega/actualiza Open Graph tags
- Agrega/actualiza Twitter Card tags
- Extrae automáticamente:
  - Título del artículo (desde `<h1>`)
  - Descripción (desde `<meta name="description">`)
  - Imagen destacada (desde `.article-featured-image`)
  - URLs correctas para cada página

### 3. Archivos Actualizados

**Total:** 26 archivos HTML actualizados

**Artículos del blog (22):**
- Todos los artículos en `public/posts/2025/10/*.html`

**Páginas principales (4):**
- `public/index.html`
- `public/quienes-somos.html`
- `public/contacto.html`
- `public/index-old.html`

## Resultado

### Mejoras para SEO y Redes Sociales

✅ **Favicon visible** en todos los navegadores y pestañas

✅ **Previews mejorados** al compartir en:
- Facebook
- Twitter/X
- LinkedIn
- WhatsApp
- Telegram
- Otros (que soporten Open Graph)

✅ **Imágenes correctas** en cada preview:
- Artículos: usan su imagen destacada
- Páginas principales: usan favicon como fallback

✅ **Titles y descripciones** optimizadas para cada plataforma

## Uso Futuro

### Generar Nuevos Artículos

Los nuevos artículos generados con `generate-content.js` **ya incluyen automáticamente** todos los meta tags.

```bash
node generate-content.js
```

### Regenerar Artículos Existentes

Al regenerar con `regenerate-post.js`, los meta tags **se preservan** (el script no los modifica).

```bash
node regenerate-post.js "public/posts/2025/10/mi-articulo.html"
```

### Actualizar Meta Tags Manualmente

Si necesitas actualizar solo los meta tags en el futuro:

```bash
node update-meta-tags.js
```

## Verificación

Para ver los cambios realizados:

```bash
git diff public/
```

Para testear cómo se ve en redes sociales:
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

## Notas Técnicas

### Estructura de URLs

- **URLs absolutas** para todos los meta tags
- **Dominio:** `https://renzodupont.com`
- **Imágenes:** URLs absolutas completas para asegurar que carguen en previews

### Fallbacks

- Si un artículo no tiene imagen destacada → usa `/favicon.ico`
- Si no hay descripción → usa descripción por defecto
- Si no hay título H1 → usa "Renzo Dupont"

### Compatibilidad

- ✅ Facebook (Open Graph)
- ✅ Twitter/X (Twitter Cards)
- ✅ LinkedIn (Open Graph)
- ✅ WhatsApp (Open Graph)
- ✅ Telegram (Open Graph)
- ✅ Discord (Open Graph)
- ✅ Slack (Open Graph)

---

**Fecha:** Octubre 2025  
**Archivos modificados:** 27 (26 HTML + 1 template JS)  
**Script utilitario:** `update-meta-tags.js`
