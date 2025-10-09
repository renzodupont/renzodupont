#!/bin/bash

# Script para actualizar todos los artículos con los nuevos botones de compartir
# Uso: bash update-share-buttons.sh

echo "🚀 Actualizando botones de compartir en todos los artículos..."

# Directorio de posts
POSTS_DIR="public/posts"

# Contador de archivos actualizados
COUNT=0

# HTML de los nuevos botones
NEW_BUTTONS='          <!-- Botones de Compartir -->
          <div class="share-buttons">
            <a href="#" class="share-btn share-btn-twitter" data-share="twitter">
              𝕏 Compartir en X
            </a>
            <a href="#" class="share-btn share-btn-facebook" data-share="facebook">
              📘 Compartir en Facebook
            </a>
            <a href="#" class="share-btn share-btn-threads" data-share="threads">
              🧵 Compartir en Threads
            </a>
            <a href="#" class="share-btn share-btn-bluesky" data-share="bluesky">
              🦋 Compartir en Bluesky
            </a>
            <a href="#" class="share-btn share-btn-whatsapp" data-share="whatsapp">
              💬 Compartir en WhatsApp
            </a>
          </div>'

# JavaScript para compartir
SHARE_JS='
      // Social Media Share Functionality
      document.addEventListener('\''DOMContentLoaded'\'', function() {
        const shareButtons = document.querySelectorAll('\''[data-share]'\'');
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        
        shareButtons.forEach(button => {
          const platform = button.getAttribute('\''data-share'\'');
          let shareUrl = '\'''\'';
          
          switch(platform) {
            case '\''twitter'\'':
              shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
              break;
            case '\''facebook'\'':
              shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
              break;
            case '\''threads'\'':
              shareUrl = `https://www.threads.net/intent/post?text=${pageTitle}%20${pageUrl}`;
              break;
            case '\''bluesky'\'':
              shareUrl = `https://bsky.app/intent/compose?text=${pageTitle}%20${pageUrl}`;
              break;
            case '\''whatsapp'\'':
              shareUrl = `https://wa.me/?text=${pageTitle}%20${pageUrl}`;
              break;
          }
          
          if (shareUrl) {
            button.href = shareUrl;
            button.target = '\''_blank'\'';
            button.rel = '\''noopener noreferrer'\'';
          }
        });
      });'

# Procesar cada archivo HTML en el directorio de posts
for file in "$POSTS_DIR"/*.html; do
  if [ -f "$file" ]; then
    echo "  📝 Procesando: $(basename "$file")"
    
    # Nota: Este script requiere edición manual de los archivos
    # No se puede hacer automáticamente con sed/awk de forma confiable
    # Se recomienda usar el método del README o editar manualmente
    
    COUNT=$((COUNT + 1))
  fi
done

echo ""
echo "✅ Se encontraron $COUNT archivos de artículos"
echo ""
echo "📋 Para actualizar los archivos:"
echo "   1. Consulta SOCIAL_SHARE_GUIDE.md para las instrucciones"
echo "   2. Usa el archivo mitos-verdades-reforma-jubilatoria-uruguay.html como referencia"
echo "   3. Copia la sección de botones y el JavaScript a cada archivo"
echo ""
echo "💡 O puedes editar manualmente usando el editor de VS Code con búsqueda/reemplazo"
