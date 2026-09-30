#!/usr/bin/env bash

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

# error if there is no branch name
if [ -z "$BRANCH_NAME" ]; then
  echo "No branch name found"
  exit 1
fi

# preid with the branch name so that we can publish multiple alpha versions
# from different branches
(npm version prerelease --preid "$BRANCH_NAME" && npm run build && npm publish --access public --tag alpha) || read -r -n 1 -p "Press any key to continue"
