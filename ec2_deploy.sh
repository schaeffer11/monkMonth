#!/bin/bash

# Turn .env into a space-delimited single line string
ENV_VARIABLES=$(grep -ve '^[[:space:]]*$' .env | grep -ve '^#' | tr -s '\n' ' ' | tr -s '\r' ' ')

npm i
npm run build
forever-service delete speedwise-platform-dev
forever-service install -s /var/nodejs/vhosts/https/speedwise-platform-app-web/dist/index.js -e "$ENV_VARIABLES" --start speedwise-platform-dev
