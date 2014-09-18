#!/bin/bash

NEWLINE=$'\n'

# Import vendor requirements
VENDOR_FILES=$'@import \'_normalize\';\n@import \'_bourbon\';\n'

# Import utility files before others
#   First find only files under utilities
#   Then wrap with import statement and quotes
#   Remove web/css from file path
#   Remove scss file extension
UTILITY_FILES=$( \
find web/css/utilities -type f | \
awk '{ printf "@import \x27%s\x27;\n", $1 }' | \
sed "s/web\/css\///g" | \
sed "s/.scss//g" \
)

# Import rest of scss files, but not utility files
#   First find sass files under web/css
#   Then wrap with import statement and quotes
#   Remove web/css from file path
#   Dont import itself (circular dep)
#   Dont import from utilities since we already have
#   Dont import regular .css files including map file
#   Remove scss file extension
SCSS_FILES=$( \
find web/css -type f | \
awk '{ printf "@import \x27%s\x27;\n", $1 }' | \
sed "s/web\/css\///g" | \
grep -v application.scss | \
grep -v utilities | \
grep -v "\.css" | \
sed "s/.scss//g" \
)

echo "$VENDOR_FILES""$UTILITY_FILES""$NEWLINE""$SCSS_FILES" > web/css/application.scss
