#!/bin/bash

while inotifywait -e modify ./db.json; do ./modifyconf.sh; done&
