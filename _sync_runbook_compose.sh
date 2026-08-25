#!/usr/bin/env bash
set -euo pipefail
f="$HOME/wsl-runbooks/scrapecraft/docker-compose.yml"
if [[ ! -f "$f" ]]; then
  echo "missing $f"
  exit 0
fi
# restore from workspace compose if mangled
cp "$HOME/workspace/scrapecraft/docker-compose.yml" "$f"
grep -E '8012|15433|REACT_APP' "$f"
echo synced_wsl_runbook_compose
