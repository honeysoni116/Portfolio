#!/bin/bash
# Exit on error
set -e

# Build Angular project for production
ng build --configuration production --output-path dist/github-portfolio --base-href /Portfolio/

# Go into the browser folder (Angular 21 puts files here)
cd dist/github-portfolio/browser

# Copy index.html to 404.html for SPA routing
cp index.html 404.html

# Deploy to GitHub Pages via SSH
npx angular-cli-ghpages --dir=. --repo=git@github.com:honeysoni116/Portfolio.git

# Go back to project root
cd ../../../
echo "✅ Deployment complete! Visit: https://honeysoni116.github.io/Portfolio/"

