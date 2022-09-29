#
# MarketJS Deployment System
# -----------------------------------------------------------------------
# Copyright (c) 2012 MarketJS Limited. Certain portions may come from 3rd parties and
# carry their own licensing terms and are referenced where applicable.
# -----------------------------------------------------------------------

#! /bin/bash
# Usage: bash push.sh [options]
# Example: bash push.sh -b -d (bake, then deploy)

# Configurations
ENABLE_FRAMEBREAKER=true
ENABLE_COPYRIGHT=true
ENABLE_CACHE_BURST=true
ENABLE_CLOUDFRONT_INVALIDATION=false

# Variables
CURRENT_DIRECTORY=${PWD}/

bake (){
    echo ""
    echo "Baking ..."
    echo ""

    cd tools
    bash bake.sh
    cd ..

    echo ""
    echo "Baking Done!"
    echo ""
}

secure_regular (){    
    # Function: protect javascript files with regular security options (no framebreaker or copyright)
    echo ""
    echo "Preparing domainlock ..."
    echo ""
    rm domainlock.js
    python prep_domainlock.py 'lib/game/main.js' 'domainlock.js' 'this.START_OBFUSCATION;' 'this.END_OBFUSCATION;'

    # domainlock breakout attempt info
    echo ""
    echo "Injecting Domainlock Breakout Attempt info"
    echo ""
    python inject_domainlock_breakout_info.py 'domainlock.js'
    
    echo ""
    echo "Preparing factory domainlock ..."
    echo ""
    prep_factory_domainlock

    echo ""
    echo "Injecting domainlock ..."
    echo ""
    python inject_domainlock.py 'domainlock.js' 'game.js' 'this.START_OBFUSCATION;' 'this.END_OBFUSCATION'

    echo ""
    echo "Cleaning up domainlock ..."
    echo ""
    rm domainlock.js

    # global obfuscation
    echo ""
    echo "Securing by obscuring ..."
    echo ""
    javascript-obfuscator 'game.js' -o 'game.js' --config 'tools/javascript-obfuscator-dev.json'
    sed -i.bak 's/{data;}else{return;}/{}else{return;}/g' game.js
    rm *.bak

    echo ""
    echo "Securing Done!"
    echo ""
}

secure_strong (){    
    # Function: protect javascript files with strong security options
    echo ""
    echo "Preparing domainlock ..."
    echo ""
    rm domainlock.js
    python prep_domainlock.py 'lib/game/main.js' 'domainlock.js' 'this.START_OBFUSCATION;' 'this.END_OBFUSCATION;'

    if [ "$ENABLE_FRAMEBREAKER" = true ] ; 
    then
        # Inject framebreaker
        echo ""
        echo "Injecting framebreaker ..."
        echo ""
        python inject_framebreaker.py 'domainlock.js'
        echo ""
    fi

    if [ "$ENABLE_COPYRIGHT" = true ] ; 
    then
        # copyright info
        echo ""
        echo "Injecting Copyright info"
        echo ""
        python inject_copyright_info.py 'domainlock.js'
    fi

    # domainlock breakout attempt info
    echo ""
    echo "Injecting Domainlock Breakout Attempt info"
    echo ""
    python inject_domainlock_breakout_info.py 'domainlock.js'
    
    echo ""
    echo "Preparing factory domainlock ..."
    echo ""
    prep_factory_domainlock

    echo ""
    echo "Injecting domainlock ..."
    echo ""
    python inject_domainlock.py 'domainlock.js' 'game.js' 'this.START_OBFUSCATION;' 'this.END_OBFUSCATION'

    echo ""
    echo "Cleaning up domainlock ..."
    echo ""
    rm domainlock.js

    # global obfuscation
    echo ""
    echo "Securing by obscuring ..."
    echo ""
    javascript-obfuscator 'game.js' -o 'game.js' --config 'tools/javascript-obfuscator-dev.json'
    sed -i.bak 's/{data;}else{return;}/{}else{return;}/g' game.js
    rm *.bak

    echo ""
    echo "Securing Done!"
    echo ""
}

prep_factory_domainlock(){
    cp domainlock.js _factory/domainlock/raw.js
}

compile_test_game (){
    echo "Compiling game.js for testing ..."
    java -jar compiler.jar \
    --warning_level=QUIET \
    --js=media/text/strings.js \
    --js=settings/dev.js \
    --js=settings/ad/mobile/preroll/themes/light/ad.js \
    --js=settings/ad/mobile/header/themes/light/ad.js \
    --js=settings/ad/mobile/footer/themes/light/ad.js \
    --js=settings/ad/mobile/end/themes/light/ad.js \
    --js=_factory/game/game.js \
    --js_output_file=game.js \
    --language_in=ECMASCRIPT5
    echo "Done!"

    echo "Compiling game.css for testing ..."
    bash css-append.sh
    bash css-minify.sh temp.css > game.css
    sed -i.bak 's/..\/..\/..\/..\/..\/..\///g' game.css
    rm temp.css
    rm *.bak

    echo "Done!"
}

prep_production (){
    echo "Zipping up media files for target language ..."

    #echo '$1:' $1
    #echo '$2:' $2
    #echo '$3:' $3
    #echo '$4:' $4

    bash zip-media-folder.sh $1
    echo "Done ..."

    echo "Create basic index.html ..."
    cp dev.html index.html
    echo "Done ..."

    echo "Cleaning up paths ..."
    # Clean CSS paths
    sed -n '/settings\/ad\/mobile\/preroll\/themes\/light\/ad.css/!p' index.html > temp && mv temp index.html
    sed -n '/settings\/ad\/mobile\/header\/themes\/light\/ad.css/!p' index.html > temp && mv temp index.html
    sed -n '/settings\/ad\/mobile\/footer\/themes\/light\/ad.css/!p' index.html > temp && mv temp index.html
    sed -n '/settings\/ad\/mobile\/end\/themes\/light\/ad.css/!p' index.html > temp && mv temp index.html
    sed -n '/settings\/debug\/debug.css/!p' index.html > temp && mv temp index.html
    sed -i.bak 's/main.css/game.css/g' index.html

    # Clean JS paths
    sed -n '/glue\/jquery\/jquery-3.2.1.min.js/!p' index.html > temp && mv temp index.html
    sed -i.bak 's/glue\/load\/load.js/game.js/g' index.html

    # Remove temp files
    echo "Removing temp files ..."
    rm *.bak
    rm temp
    echo "Done!"

    # Transfer to _factory
    # Make 2 versions of index.html (raw and customized)
    # Raw
    sed '/<!-- SECTION GENERATED BY CODE -->/,/<!-- END OF SECTION GENERATED BY CODE -->/d' index.html > _factory/index/raw.html
    # Customized
    cp index.html _factory/index/custom.html

    echo "Compiling game.js for _factory ..."
    java -jar compiler.jar \
    --warning_level=QUIET \
    --js=glue/jquery/jquery-3.2.1.min.js \
    --js=glue/ie/ie.js \
    --js=glue/jukebox/Player.js \
    --js=glue/howler/howler.js \
    --js=game.min.js \
    --js_output_file=_factory/game/game.js \
    --language_in=ECMASCRIPT5
    echo "Done!"

    # Remove temp files
    echo "Removing game.min.js ..."
    rm game.min.js
    echo "Done!"
}

deploy (){
    echo ""
    echo "Deploying ..."
    echo ""

    python boto-s3-upload.py -l $2 $1

    echo ""
    echo "Deploying Done!"
    echo ""
	
	if [ "$ENABLE_CLOUDFRONT_INVALIDATION" = true ] ; 
    then
        echo ""
        echo "Clearing cloudfront cache ..."
        echo ""
        python cloudfront_invalidate_cache.py $2
    fi
}

gitpush (){
    git add --all
    git commit -m "$*"
    git push origin master
}

inject_burst_cache_version_tag(){
    # Function: inject version tag to burst cache in index.html
    if [ "$ENABLE_CACHE_BURST" = true ] ; 
    then
        # Inject cache burst versioning tag
        echo ""
        echo "Injecting cache burst versioning tag ..."
        echo ""
        CACHE_BURST_VERSION_TAG="v=$(date +%s)"
        echo "Injecting the version into index.html ..."
        sed -i.bak 's/game.js/game.js?'$CACHE_BURST_VERSION_TAG'/g' index.html
        sed -i.bak 's/game.css/game.css?'$CACHE_BURST_VERSION_TAG'/g' index.html
        rm *.bak
        echo "Done!"
        echo ""
    fi
}
while getopts "l:bnahg:" opt; do
  case $opt in
    h)
        echo "Usage: sh push.sh [option]"
        echo "Deploy Options"
        echo "\t -b \t Build all files"
        echo "\t -l \t Select language by code (en,jp,kr,zh,de,es, etc ...)"
        echo "\t -a \t Upload all files"
        echo "\t -n \t Upload new (recent) files up to 12 hrs"
        echo "\t -g \t Add, commit and push to remote repo (origin)"
        echo "Working example (copy paste directly): sh push.sh -b -l jp -a -g 'somefix'"
      ;;
    l)
        echo "language to use:" $3
      ;;
    b)
        bake
        prep_production $3
        compile_test_game
        # secure_regular
        secure_strong
		inject_burst_cache_version_tag
      ;;
    n)
        deploy --new $3
      ;;
    a)
        deploy --all $3
      ;;
    g)
        gitpush $OPTARG
      ;;
    \?)
        echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done
