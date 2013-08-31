#! /bin/bash
# Usage: sh zip.sh

CURRENT_DIRECTORY=${PWD##*/}

# Remove current zip file
rm game.zip

# Build zip (need to make more efficient file)
zip -9 -r game.zip ../$CURRENT_DIRECTORY -x "*/settings*" -x "*/factory*" -x "*/strings*" -x "*/glue*" -x "*/media*" -x "*/lib*" -x "*/tools*" -x "*dev.html" -x "*customization.js" -x "*game.js" -x "*.zip*" -x "*.git*" -x "*.psd*" -x "*.xcf*" -x "*.aif*" -x "*.tiff*" -x "*.au*" -x "*.txt*" -x "*.bat*" -x "*.jar*" -x "*.py*" -x "*.sh*" -x "*.php*" -x "*.htaccess" -x "*.DS_Store"

# Doesn't work :(
#zip -9 -r game.zip ${PWD} --exclude "exclude.txt"