#! /bin/bash
# Global Variables
_VERSION="v$(date +%s)"

# Function declarations and definitions
inject_javascript_obfuscator(){
    echo "[Builder]: Injecting obfuscation config file ..."
    cp -f tools/javascript-obfuscator-dev.json tools/javascript-obfuscator-dev.json
}

inject_version_number(){
    echo "[Builder]: Injecting the version into index.html ..."
    sed -i.bak 's/game.js/game.js?'$_VERSION'/g' index.html
    sed -i.bak 's/api.js/api.js?'$_VERSION'/g' index.html
    sed -i.bak 's/api.css/api.css?'$_VERSION'/g' index.html
    rm *.bak
}

# Processes
# Pre-build
inject_javascript_obfuscator

# Build the game
echo "[Builder]: Building the game..."
sh push.sh -b

# Post-build
inject_version_number

# Push to s3. 
echo "[Builder]: Push to S3..."
# Use the boto-s3-upload file you prepared
python boto-s3-upload.py -l en -a

# Send verification that clouldfront cache need to be cleared. 
echo "[Builder]: Reset cloudfront cache..."
# Use the Cloudfront Invalidation script you prepared
python cloudfront_invalidate_cache_production.py