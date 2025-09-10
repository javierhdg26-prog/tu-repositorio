#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob
PATTERNS=( "src" "public" "index.html" "vite.config.*" "tailwind.config.*" "postcss.config.*" "package-lock.json" )
echo "DRY RUN — estos archivos/carpetas serían eliminados si ejecutas el script de limpieza:"
for p in "${PATTERNS[@]}"; do
  matches=( $p )
  if (( ${#matches[@]} )); then
    for file in "${matches[@]}"; do
      printf "  - %s\n" "$file"
    done
  fi
done
