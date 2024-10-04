
SPACER="======================================"
EG="🔷"

PATH=$PATH:/root/.nvm/versions/node/v22.3.0/bin:/root/.cargo/bin

cd /x/g00je/site/

OLD_COMMIT=$(git rev-parse HEAD)

echo "$EG update the source"
git pull
echo $SPACER

NEW_COMMIT=$(git rev-parse HEAD)

function check_diff {
    local file_has_changed=$(git diff --name-only $OLD_COMMIT...$NEW_COMMIT --exit-code $1)
    if [ -z "$file_has_changed" ]; then
        return 1
    else
        return 0
    fi
}

if check_diff "config/g00je.site.service"; then
    echo "$EG reload the service"
    cp config/g00je.site.service /etc/systemd/system/ --force
    systemctl daemon-reload
    echo $SPACER
fi

if check_diff "package.json"; then
    echo "$EG install npm packages"
    npm i
    echo $SPACER
fi

if check_diff "web/*"; then
    echo "$EG build the web!"
    npm run web
    echo $SPACER
fi

if check_diff "src/* Cargo.toml"; then
    echo "$EG cargo build"
    cargo build --release
    echo $SPACER
fi

if check_diff "src/* templates/*"; then
    echo "$EG restart g00je"
    systemctl restart g00je.site
    echo $SPACER
fi

if check_diff "config/nginx.conf"; then
    echo "$EG restart nginx"
    if nginx -t; then
        systemctl restart nginx
    else
        echo invalid nginx status ❌
    fi
    echo $SPACER
fi

echo "Deploy is Done! ✅"
