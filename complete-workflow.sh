#!/bin/bash

# Complete Workflow Script
# Automates the entire process: organize posts → update links → generate images → update image links

echo "🎯 Complete Blog Workflow Automation"
echo "===================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo ""
    echo "📝 Please run setup first:"
    echo "   cp .env.example .env"
    echo "   # Then edit .env and add your GEMINI_API_KEY"
    echo ""
    echo "   Get your FREE key: https://aistudio.google.com/app/apikey"
    exit 1
fi

# Check if GEMINI_API_KEY is configured
if grep -q "your_gemini_api_key_here" .env; then
    echo "⚠️  Warning: Gemini API key not configured in .env"
    echo ""
    echo "📝 Edit .env and add your actual API key"
    echo "   Get it here: https://aistudio.google.com/app/apikey"
    echo ""
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📋 Workflow Steps:"
echo "  1. Organize posts into year/month folders"
echo "  2. Update all links in HTML files"
echo "  3. Generate images for posts without them"
echo "  4. Update HTML files with generated image links"
echo ""

# Parse arguments
DRY_RUN=false
SKIP_ORGANIZE=false
SKIP_LINKS=false
SKIP_IMAGES=false
ALL_IMAGES=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run|-d)
            DRY_RUN=true
            shift
            ;;
        --skip-organize)
            SKIP_ORGANIZE=true
            shift
            ;;
        --skip-links)
            SKIP_LINKS=true
            shift
            ;;
        --skip-images)
            SKIP_IMAGES=true
            shift
            ;;
        --all-images)
            ALL_IMAGES=true
            shift
            ;;
        --help|-h)
            echo "Usage: ./complete-workflow.sh [options]"
            echo ""
            echo "Options:"
            echo "  --dry-run, -d        Preview changes without modifying files"
            echo "  --skip-organize      Skip post organization step"
            echo "  --skip-links         Skip link update step"
            echo "  --skip-images        Skip image generation step"
            echo "  --all-images         Generate images for all posts (not just current month)"
            echo "  --help, -h           Show this help message"
            echo ""
            echo "Examples:"
            echo "  # Preview complete workflow"
            echo "  ./complete-workflow.sh --dry-run"
            echo ""
            echo "  # Only generate images (skip organization)"
            echo "  ./complete-workflow.sh --skip-organize --skip-links"
            echo ""
            echo "  # Organize and generate all images"
            echo "  ./complete-workflow.sh --all-images"
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

if [ "$DRY_RUN" = true ]; then
    echo "🔍 DRY RUN MODE - No changes will be made"
    echo ""
fi

# Step 1: Organize Posts
if [ "$SKIP_ORGANIZE" = false ]; then
    echo "📦 Step 1: Organizing posts..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    if [ "$DRY_RUN" = true ]; then
        npm run organize-posts-dry
    else
        npm run organize-posts
    fi
    
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Post organization failed!"
        exit 1
    fi
    echo ""
else
    echo "⏭️  Skipping post organization"
    echo ""
fi

# Step 2: Update Links
if [ "$SKIP_LINKS" = false ] && [ "$SKIP_ORGANIZE" = false ]; then
    echo "🔗 Step 2: Updating links..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    if [ "$DRY_RUN" = true ]; then
        npm run update-links-dry
    else
        npm run update-links
    fi
    
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Link update failed!"
        exit 1
    fi
    echo ""
elif [ "$SKIP_ORGANIZE" = false ]; then
    echo "⏭️  Skipping link updates"
    echo ""
fi

# Step 3: Generate Images
if [ "$SKIP_IMAGES" = false ]; then
    echo "🎨 Step 3: Generating images..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    if [ "$DRY_RUN" = true ]; then
        echo "ℹ️  Dry run mode doesn't apply to image generation"
        echo "   (Images won't be generated in dry run)"
        echo ""
    else
        if [ "$ALL_IMAGES" = true ]; then
            echo "📸 Generating images for ALL posts..."
            npm run generate-images-all
        else
            echo "📸 Generating images for current month's posts..."
            npm run generate-images
        fi
        
        if [ $? -ne 0 ]; then
            echo ""
            echo "⚠️  Image generation had issues (check output above)"
            echo "   This is not necessarily an error - some posts may already have images"
        fi
        
        # Step 4: Update image links in HTML files
        echo "🔗 Step 4: Updating image links in HTML files..."
        if [ "$DRY_RUN" = true ]; then
            node update-post-images.js --dry-run
        else
            node update-post-images.js
        fi
        
        if [ $? -eq 0 ]; then
            echo "✅ Image links updated successfully!"
        else
            echo "⚠️  Image link update had issues (check output above)"
        fi
    fi
    echo ""
else
    echo "⏭️  Skipping image generation and image link updates"
    echo ""
fi

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$DRY_RUN" = true ]; then
    echo "✅ Dry run complete!"
    echo ""
    echo "💡 Run without --dry-run to apply changes:"
    echo "   ./complete-workflow.sh"
else
    echo "🎉 Workflow complete!"
    echo ""
    echo "📁 Check your changes:"
    echo "   - Posts organized in: public/posts/YYYY/MM/"
    echo "   - Images saved in: public/images/"
    echo "   - Links updated in: public/*.html"
fi
echo ""
