#!/usr/bin/env bash
set -euo pipefail
echo "📂 Estructura del proyecto (ignorando node_modules, .git, dist):"
if command -v tree >/dev/null 2>&1; then
  tree -a -I 'node_modules|.git|dist'
else
  echo "tree no instalado. Usando find como alternativa:"
  find . -path './node_modules' -prune -o -path './.git' -prune -o -path './dist' -prune -o -print | sed 's|^\./||'
fi
