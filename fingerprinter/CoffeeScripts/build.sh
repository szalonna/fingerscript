#!/bin/bash
coffee --compile --output ../JS/ main.coffee
coffee -cj ../JS/worker.js worker/*.coffee
echo "Built"