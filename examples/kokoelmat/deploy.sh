#!/bin/sh
npm run build
rm -rf ../../examples/notes/build
cp -r build ../../examples/notes
