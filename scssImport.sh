#!/bin/bash

# find web/css -type f | \                            List all files under web/css
# awk '{ printf "@import \x27%s\x27;\n", $1 }' | \    Wrap the filepath string with @import('')
# sed "s/web\/css\///g" | \                           Remove the web/css part of the file path
# sed "/application/d" | \                            Don't include application.scss (prevent including itself)
# sed "/\.css/d" | \                                  Don't include .css files and .css.map file
# sed "s/.scss//g" > \                                Remove the .scss file extension from includes
# web/css/application.scss                            Write out to application.scss and overwrite what's there

VENDOR_FILES=$'@import \'_normalize\';\n@import \'_bourbon\';\n'

SCSS_FILES=$( \
find web/css -type f | \
awk '{ printf "@import \x27%s\x27;\n", $1 }' | \
sed "s/web\/css\///g" | \
sed "/application/d" | \
sed "/\.css/d" | \
sed "s/.scss//g" \
)

echo "$VENDOR_FILES""$SCSS_FILES" > web/css/application.scss
