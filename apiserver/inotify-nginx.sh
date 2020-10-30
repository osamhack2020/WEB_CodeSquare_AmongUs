#!/bin/bash

while inotifywait -e modify /etc/nginx/user-vm; do nginx -s reload; done&
