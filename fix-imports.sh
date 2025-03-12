#!/bin/bash

# Find all TypeScript files and replace double quotes with single quotes in imports
find ./src -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/import \(.*\) from "\(.*\)"/import \1 from '\''\2'\''/g'
find ./src -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/import  *{/import {/g'
find ./src -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/} *from/} from/g'

echo "Fixed imports in TypeScript files" 