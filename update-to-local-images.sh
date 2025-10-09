#!/bin/bash

# Script to update HTML files to use locally generated images
# Run this after generating images with: npm run generate-images

echo "🔄 Updating HTML files to use locally generated images..."
echo ""

# Array of article slugs
articles=(
    "fake-news-dolar-argentina"
    "mitos-verdades-reforma-jubilatoria-uruguay"
    "ahorro-inversion-publica-argentina"
    "lawfare-rio-plata"
    "concentracion-mediatica-rio-plata"
    "privatizacion-educacion-publica"
    "flexibilizacion-laboral-derechos"
    "deuda-externa-politicas-sociales"
    "criminalizacion-protesta-social"
    "discurso-anti-derechos"
    "desmantelamiento-tv-publica"
    "poder-big-tech-monopolios-digitales"
    "uberizacion-trabajo-precarizacion"
    "granjas-trolls-desinformacion-industria"
    "inseguridad-alimentaria-argentina"
    "seguridad-populismo-punitivo-uruguay"
    "contaminacion-agua-agronegocio-uruguay"
    "justicia-climatica-sur-global"
    "amenaza-mapuche-uruguay"
    "big-pharma-ganancias-vs-vidas"
)

updated=0
not_found=0

for slug in "${articles[@]}"; do
    article_file="public/posts/${slug}.html"
    image_file="public/images/${slug}.jpg"
    
    if [ ! -f "$article_file" ]; then
        echo "⚠️  Article not found: $article_file"
        not_found=$((not_found + 1))
        continue
    fi
    
    if [ ! -f "$image_file" ]; then
        echo "⚠️  Image not generated yet: $image_file"
        echo "   Run: npm run generate-images"
        not_found=$((not_found + 1))
        continue
    fi
    
    # Update the article HTML file to use local image
    # This replaces Unsplash URLs with local image paths
    sed -i "s|https://source.unsplash.com/[^\"]*|/images/${slug}.jpg|g" "$article_file"
    
    echo "✅ Updated: $slug"
    updated=$((updated + 1))
done

# Update index.html cards
echo ""
echo "🏠 Updating index.html article cards..."

for slug in "${articles[@]}"; do
    image_file="public/images/${slug}.jpg"
    
    if [ -f "$image_file" ]; then
        # Update index.html to use local images
        sed -i "s|https://source.unsplash.com/600x400/[^\"]*\" alt=\"[^\"]*\"/>|/images/${slug}.jpg\" alt=\"Article image\"/>|g" public/index.html
    fi
done

echo "✅ Updated index.html"
echo ""
echo "📊 Summary:"
echo "   ✅ Updated: $updated articles"
echo "   ⚠️  Not found/skipped: $not_found"
echo ""
echo "🎉 Done! Your site now uses locally generated images."
