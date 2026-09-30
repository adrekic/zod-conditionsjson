#!/usr/bin/env bash

(npm version major --no-git-tag-version && npm run build && npm publish --access public) || read -r -n 1 -p "Press any key to continue"
