#!/bin/bash

set -e

install_deps() {
  if [ "$CI" == "true" ]; then
    if [ ! -d "node_modules" ]; then # install dependencies if not already present
      yarn install --frozen-lockfile
    fi
  else # if not in CI, install dependencies
    yarn install
  fi
}

unit_test() {
  install_deps
  yarn run coverage
}

install_deps
export PATH=$(pwd)/node_modules/.bin/:$PATH

unit_test $i
