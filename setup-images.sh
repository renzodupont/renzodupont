#!/bin/bash

# Setup script for Image Generation with Gemini API

echo "🎨 Setting up Image Generation for No Más Desinformación"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your Gemini API key!"
    echo ""
    echo "   Get your FREE API key here:"
    echo "   👉 https://aistudio.google.com/app/apikey"
    echo ""
    echo "   Then open .env and replace 'your_gemini_api_key_here' with your actual key"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "📚 Next steps:"
echo ""
echo "1. Get your Gemini API key: https://aistudio.google.com/app/apikey"
echo "2. Edit .env and add your API key"
echo "3. Generate images:"
echo ""
echo "   # Generate all images at once:"
echo "   npm run generate-images"
echo ""
echo "   # Generate a single image for new article:"
echo "   node generate-images.js \"article-slug\" \"Title\" \"prompt\""
echo ""
echo "📖 Read IMAGE_GENERATION_GUIDE.md for complete instructions"
echo ""
