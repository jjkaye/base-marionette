#!/bin/bash

# find web/css -type f | \                            List all files under web/css
# awk '{ printf "@import \x27%s\x27;\n", $1 }' | \    Wrap the filepath string with @import('')
# sed "s/web\/css\///g" | \                           Remove the web/css part of the file path
# grep -v application.scss | \                        Don't include application.scss (prevent including itself)
# grep -v "\.css" | \                                 Don't include .css files and .css.map file
# sed "s/.scss//g" > \                                Remove the .scss file extension from includes
# web/css/application.scss                            Write out to application.scss and overwrite what's there

VENDOR_FILES=$'@import \'_normalize\';\n@import \'_bourbon\';\n'

SCSS_FILES=$( \
find web/css -type f | \
awk '{ printf "@import \x27%s\x27;\n", $1 }' | \
sed "s/web\/css\///g" | \
grep -v application.scss | \
grep -v "\.css" | \
sed "s/.scss//g" \
)

echo "$VENDOR_FILES""$SCSS_FILES" > web/css/application.scss
