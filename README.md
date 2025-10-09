# Renzo Dupont - Tech Blog 💻

**Blog de tecnología y desarrollo web en español**

Contenido técnico de alta calidad sobre desarrollo web, programación y tecnología moderna para la comunidad hispanohablante, con enfoque en Uruguay y Latinoamérica.

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar API key (obtener en https://aistudio.google.com/app/apikey)
cp .env.example .env
# Edita .env y agrega tu GEMINI_API_KEY

# 3. Iniciar servidor
npm start
# Visita: http://localhost:8888
```

---

## 📋 Comandos Disponibles

### 🎯 **Comandos Principales (Más Usados)**

#### 1. Crear Nuevo Post Completo

```bash
npm run create-post "Tema o concepto técnico del artículo"
```

**Qué hace:** Genera artículo técnico completo en español + imagen de portada + actualiza base de datos  
**Características:**

- ✅ **Título generado automáticamente por IA** (técnico y atractivo)
- ✅ 1500-2500 palabras en español
- ✅ 5-8 referencias técnicas confiables (MDN, documentación oficial, etc.)
- ✅ Ejemplos de código cuando sea relevante
- ✅ Tecnologías y frameworks actuales (2024-2025)
- ✅ Imagen técnica generada con IA
- ✅ SEO optimizado

**Ejemplo:**

```bash
npm run create-post "React Server Components y su impacto en el desarrollo web"
npm run create-post "TypeScript vs JavaScript en 2025"
npm run create-post "Optimización de rendimiento en Next.js"
```

**💡 Tip:** No necesitas pensar en el título final. Solo describe el tema técnico y Gemini creará un título informativo y atractivo automáticamente.

---

#### 2. Regenerar Post Existente (Mejorar)

```bash
npm run regenerate-post "ruta/al/post.html"
```

**Qué hace:** Mejora un artículo técnico existente con más referencias y mejores explicaciones  
**Características:**

- ✅ Más referencias técnicas actualizadas
- ✅ Mejores explicaciones y ejemplos
- ✅ Información más reciente (2024-2025)
- ✅ Crea backup automático del original
- ✅ Actualiza metadata y base de datos

**Ejemplo:**

```bash
npm run regenerate-post "public/posts/2025/10/react-hooks-guia.html"
```

---

#### 3. Regenerar TODOS los Posts

```bash
npm run regenerate-all
```

**Qué hace:** Mejora TODOS los artículos del sitio automáticamente  
**Características:**

- ⚡ Procesa todos los posts en public/posts/
- 🔄 Espera 5 segundos entre posts (evitar rate limiting)
- � Crea backup de cada original
- 📊 Muestra resumen con estadísticas
- ⏱️ Estimado: ~2-3 minutos por artículo

**Perfecto para:** Actualizar toda la base de artículos con nueva información y fuentes

---

#### 4. Iniciar Servidor Local

```bash
npm start
```

O también:

```bash
npm run dev
```

**Qué hace:** Inicia el servidor Express en http://localhost:8888  
**Uso:** Para ver el sitio localmente antes de desplegar

---

### 🎨 **Generación de Imágenes**

#### 6. Generar Imágenes para Posts Nuevos

```bash
npm run generate-images
```

**Qué hace:** Genera imágenes solo para posts que NO tienen imagen  
**Características:**

- 🎨 Usa Gemini Imagen 3.0
- 🚀 Procesa solo mes actual
- 🔍 Detecta posts sin imagen automáticamente

---

#### 7. Generar Imágenes (Modo Inteligente)

```bash
npm run generate-images-smart
```

**Qué hace:** Igual que `generate-images` pero con análisis más profundo del contenido

---

#### 8. Regenerar TODAS las Imágenes

```bash
npm run generate-images-all
```

**Qué hace:** Regenera imágenes para TODOS los posts (incluye los que ya tienen)  
**⚠️ Advertencia:** Sobrescribe imágenes existentes

---

### � **Generación de Contenido**

#### 9. Crear Solo Contenido (Sin Imagen)

```bash
npm run create-content "Tema o concepto"
```

**Qué hace:** Genera solo el HTML del artículo (sin imagen ni actualizar BD)  
**Uso:** Cuando quieres revisar el contenido antes de generar la imagen

**💡 Importante:** El título se genera automáticamente por IA. Solo proporciona el tema/concepto.

**Con contexto adicional:**

```bash
node generate-content.js "Tema" --context "Enfocarse en datos 2024-2025"
```

**Modo interactivo:**

```bash
node generate-content.js --interactive
```

**Modo batch (múltiples artículos):**

```bash
node generate-content.js --batch topics.json
```

---

### 🗂️ **Organización y Mantenimiento**

#### 10. Organizar Posts por Fecha

```bash
npm run organize-posts
```

**Qué hace:** Mueve posts a estructura `YYYY/MM/slug.html`  
**Ejemplo:** `post.html` → `2025/10/post.html`

**Vista previa (sin hacer cambios):**

```bash
npm run organize-posts-dry
```

---

#### 11. Actualizar Links Internos

```bash
npm run update-links
```

**Qué hace:** Actualiza todos los enlaces después de reorganizar posts  
**Uso:** Ejecutar después de `organize-posts`

**Vista previa:**

```bash
npm run update-links-dry
```

---

#### 12. Actualizar Referencias de Imágenes

```bash
npm run update-images
```

**Qué hace:** Actualiza las rutas de imágenes en los posts HTML

**Vista previa:**

```bash
npm run update-images-dry
```

---

### ⚡ **Workflow Completo**

#### 13. Ejecutar Workflow Completo

```bash
npm run workflow
```

**Qué hace:** Ejecuta organizar + generar imágenes + actualizar links (todo de una vez)

**Vista previa:**

```bash
npm run workflow-dry
```

---

## 📚 Documentación Detallada

### Guías Principales

- **[COMANDOS_ACTUALIZADOS.md](COMANDOS_ACTUALIZADOS.md)** - Guía completa en español de todos los comandos
- **[AUTOMATION_GUIDE.md](AUTOMATION_GUIDE.md)** - Guía completa de automatización
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Referencia rápida de comandos

### Guías Específicas

- **[REGENERACION_MASIVA.md](REGENERACION_MASIVA.md)** - Cómo regenerar todos los posts
- **[ACTUALIZACION_URUGUAY.md](ACTUALIZACION_URUGUAY.md)** - Optimización para Uruguay
- **[IMAGE_GENERATION_GUIDE.md](IMAGE_GENERATION_GUIDE.md)** - Generación de imágenes
- **[WORKFLOW_GUIDE.md](WORKFLOW_GUIDE.md)** - Flujo de trabajo completo

### Configuración y Solución de Problemas

- **[SETUP_CHECKLIST.md](SETUP_CHECKLIST.md)** - Checklist de configuración
- **[GITHUB_ACTIONS_TROUBLESHOOTING.md](GITHUB_ACTIONS_TROUBLESHOOTING.md)** - Solucionar problemas de despliegue

---

## 🎯 Workflows Comunes

### Crear y Publicar Nuevo Artículo

```bash
# 1. Crear post completo (solo da el tema, no el título final)
npm run create-post "Impacto de la inflación en Uruguay"

# El sistema genera automáticamente:
# - Título fuerte y atractivo
# - Artículo completo 1500-2500 palabras
# - Imagen de portada
# - Actualiza base de datos

# 2. Revisar localmente
npm start
# Visita: http://localhost:8888

# 3. Desplegar
git add .
git commit -m "Add: React Server Components tutorial"
git push origin main
# GitHub Actions despliega automáticamente
```

---

### Mejorar Artículo Existente

```bash
# 1. Regenerar con referencias actualizadas
npm run regenerate-post "public/posts/2025/10/viejo-articulo.html"

# 2. Revisar cambios
npm start

# 3. Desplegar
git add .
git commit -m "Update: Mejorar viejo-articulo con info 2024-2025"
git push origin main
```

---

### Actualizar Toda la Base de Artículos

```bash
# 1. Regenerar todos (toma tiempo!)
npm run regenerate-all
# ⏱️ Estimado: 15 artículos = ~45 minutos

# 2. Revisar algunos al azar
npm start

# 3. Desplegar
git add .
git commit -m "Regenerate all posts with updated references"
git push origin main
```

---

### Reorganizar Posts y Generar Imágenes

```bash
# 1. Vista previa de cambios
npm run workflow-dry

# 2. Ejecutar workflow completo
npm run workflow

# 3. Desplegar
git add .
git commit -m "Organize posts and generate images"
git push origin main
```

---

## 🛠️ Características del Sistema

### ✅ Contenido Generado

- **Idioma:** 100% español para mercado hispanohablante
- **Enfoque:** Tecnología moderna, desarrollo web, programación
- **Referencias:** Mínimo 5-8 referencias técnicas por artículo
- **Actualidad:** Prioriza tecnologías y frameworks 2024-2025
- **Longitud:** 1500-2500 palabras
- **Estructura:** H2/H3, listas, código, explicaciones claras

### ✅ Referencias Prioritarias

**Documentación Oficial:**

- MDN Web Docs
- React, Vue, Angular docs
- Node.js, Python.org
- TypeScript, Next.js

**Comunidad y Recursos:**

- Stack Overflow, GitHub
- CSS-Tricks, Smashing Magazine
- Dev.to, Medium (technical)
- Estudios de rendimiento y benchmarks

### ✅ Imágenes

- Generadas con Gemini Imagen 3.0
- Estilo técnico moderno
- Sin texto ni watermarks
- Formato optimizado para web

---

## 📁 Estructura del Proyecto

```
renzodupont-tech/
├── app.js                      # Servidor Express
├── package.json                # Scripts y dependencias
├── .env                        # API keys (no incluido en repo)
├── .env.example                # Plantilla de configuración
│
├── generate-content.js         # Generación de artículos con IA
├── regenerate-post.js          # Mejora de artículos existentes
├── orchestrate-post.js         # Pipeline completo (contenido + imagen + BD)
├── generate-images-smart.js    # Generación inteligente de imágenes
├── organize-posts.js           # Organización por fecha
├── update-post-links.js        # Actualización de enlaces
├── complete-workflow.sh        # Script de workflow completo
│
├── posts-database.json         # Base de datos de posts
├── posts-config.xml            # Configuración de posts
├── example-topics.json         # Temas técnicos de ejemplo
│
└── public/                     # Archivos públicos
    ├── index.html              # Página principal
    ├── quienes-somos.html      # Sobre mí
    ├── contacto.html           # Contacto
    ├── css/
    │   └── style.css           # Estilos (dark theme + turquesa)
    ├── images/                 # Imágenes generadas
    └── posts/                  # Artículos
        └── 2025/
            └── 10/
                ├── post-1.html
                ├── post-1-1.png
                ├── post-2.html
                └── post-2-1.png
```

---

## 🔧 Requisitos

### Obligatorios

- **Node.js** 14 o superior
- **GEMINI_API_KEY** (gratis en https://aistudio.google.com/app/apikey)

### Dependencias (se instalan con npm install)

- `express` - Servidor web
- `@google/generative-ai` - API de Gemini para contenido
- `@google/genai` - API de Imagen para imágenes
- `dotenv` - Variables de entorno
- `jsdom` - Manipulación de HTML
- `node-fetch` - HTTP requests

---

## 🚀 Despliegue

El sitio se despliega automáticamente via **GitHub Actions** cuando haces push a `main`:

```bash
git add .
git commit -m "Tu mensaje"
git push origin main
```

GitHub Actions automáticamente:

1. Se conecta a tu servidor via SSH
2. Hace `git pull` de los cambios
3. Ejecuta `npm install`
4. Reinicia el proceso
5. Sitio actualizado! ✅

**Monitorear despliegue:** https://github.com/renzodupont/renzodupont/actions

---

## 📊 Checklist de Calidad

Antes de publicar un artículo, verificar:

- [ ] Está en español
- [ ] Menciona 5-8 referencias técnicas
- [ ] Incluye información de 2024-2025
- [ ] Tiene ejemplos de código si son relevantes
- [ ] Cita documentación oficial
- [ ] Estructura clara con H2/H3
- [ ] 1500-2500 palabras
- [ ] Tiene imagen de portada
- [ ] Links funcionan correctamente
- [ ] Revisado en localhost antes de push

---

## 🐛 Solución de Problemas

### Error: "GEMINI_API_KEY not found"

```bash
# Verifica tu .env
cat .env | grep GEMINI_API_KEY

# Si no existe, agrégala
echo "GEMINI_API_KEY=tu_clave_aqui" >> .env
```

### Contenido no en español

Con los nuevos prompts, todo debería estar en español. Si no:

```bash
# Verifica que tienes la última versión
git pull origin main
```

### API rate limit exceeded

Espera 24 horas o actualiza a plan pago de Gemini API.

---

## 📧 Contacto

Para consultas, colaboraciones o sugerencias:  
**renzo@renzodupont.com**

---

## 📜 Licencia

MIT License - Usa, modifica y distribuye libremente.

---

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m "Add: nueva funcionalidad"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

**Tecnología en español. Conocimiento sin barreras.** 💻
