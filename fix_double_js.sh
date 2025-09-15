#!/usr/bin/env bash
set -euo pipefail

echo "🔎 Buscando archivos con extensión doble .js.js..."

files=$(find . -type f -name "*.js.js")

if [ -z "$files" ]; then
  echo "✅ No se encontraron archivos con extensión doble."
else
  echo "⚠️ Se encontraron los siguientes archivos:"
  echo "$files"
  echo
  echo "🔧 Renombrando..."

  for f in $files; do
    new_name="${f%.js.js}.js"
    mv "$f" "$new_name"
    echo "✔️  Renombrado: $f → $new_name"
  done

  echo "🎉 Todos los archivos fueron corregidos."
fi
