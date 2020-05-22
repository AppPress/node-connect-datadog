#!/bin/sh

set -x

publish () {
    npm version ${NEW_VERSION} --commit-hooks=false
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > .npmrc
    echo "registry=https://npm.pkg.github.com/mergermarket" >> .npmrc
    npm publish
    [ $? -eq 0 ] || exit 1
}

publish "connect-datadog"

git add . && git commit -m 'Publishing new versions'
git pull "https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/mergermarket/node-connect-datadog.git" HEAD:master -r
git push "https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/mergermarket/node-connect-datadog.git" HEAD:master --no-verify
