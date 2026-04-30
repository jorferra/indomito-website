#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TMP_DIR="$(mktemp -d)"
DEPLOY_DIR="$TMP_DIR/gh-pages"

cleanup() {
  git worktree remove --force "$DEPLOY_DIR" >/dev/null 2>&1 || true
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

cd "$ROOT"
npm run build

git worktree prune >/dev/null 2>&1 || true
git worktree add --force -B gh-pages "$DEPLOY_DIR" origin/gh-pages

rsync -a -c --delete --exclude '.git' --exclude '.DS_Store' dist/ "$DEPLOY_DIR"/
touch "$DEPLOY_DIR/.nojekyll"

cd "$DEPLOY_DIR"
git add -A
if git diff --cached --quiet; then
  echo "No deploy changes to publish."
  exit 0
fi

git commit -m "Deploy site"
git push origin gh-pages
