#!/bin/bash
# 🚀 Script para corregir errores de template strings en el proyecto

CONFIG_DIR="src/pages"

echo "🔍 Buscando template strings mal escapados en $CONFIG_DIR ..."

# Buscar y corregir backticks escapados (\`)
find "$CONFIG_DIR" -type f -name "*.jsx" -print0 | while IFS= read -r -d '' file; do
  if grep -q "\\\`" "$file"; then
    echo "🛠 Corrigiendo en: $file"
    sed -i 's/\\\`/`/g' "$file"
  fi
done

echo "✅ Todos los template strings han sido corregidos."

# Verificar si hay cambios para hacer commit
if git diff --quiet; then
  echo "ℹ️ No hay cambios para commitear."
else
  git add "$CONFIG_DIR"
  git commit -m "fix: corregidos template strings"
  echo "📦 Commit realizado con éxito."
fi
