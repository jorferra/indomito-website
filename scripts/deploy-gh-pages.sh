#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

cd "$ROOT"
npm run build

DEPLOY_DIR="$TMP_DIR/gh-pages"
git worktree add --force -B gh-pages "$DEPLOY_DIR" origin/gh-pages

rsync -a --delete --exclude '.git' dist/ "$DEPLOY_DIR"/
touch "$DEPLOY_DIR/.nojekyll"

cd "$DEPLOY_DIR"
git add -A
if git diff --cached --quiet; then
  echo "No deploy changes to publish."
  exit 0
fi

git commit -m "Deploy site"
git push origin gh-pages
