#!/bin/sh
npm run build
rm -rf ../../examples/hellonode/build
cp -r build ../../examples/hellonode
