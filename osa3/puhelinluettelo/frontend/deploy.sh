#!/bin/sh
npm run build
rm -rf ../../osa3/backend/build
cp -r build ../../osa3/backend
