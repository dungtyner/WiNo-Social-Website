#!/bin/bash
CSS_FILE="./node_modules/emoji-picker-react/dist/main.css"

if [ -f "$CSS_FILE" ]; then
    sed -i 's/font-family: font-family: /font-family: /g' "$CSS_FILE"
    echo "Modified CSS file successfully"
else
    echo "CSS file does not exist"
fi