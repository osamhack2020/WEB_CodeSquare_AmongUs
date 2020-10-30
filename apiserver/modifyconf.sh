#!/bin/bash

idx=0

rm -f ./code-server.conf
echo "server {
listen 443;
listen [::]:443;
server_name ide.codesquare.space;
ssl on;
ssl_certificate /etc/nginx/codesquare.space.crt;
ssl_certificate_key /etc/nginx/codesquare.space.key;" >> code-server.conf

while [ $(cat db.json | jq '.urlinfo' | jq '.['"$idx"']' | jq '.name') != "null" ]; do
	name=$(cat db.json | jq '.urlinfo' | jq '.['"$idx"']' | jq '.name')
	addr=$(cat db.json | jq '.urlinfo' | jq '.['"$idx"']' | jq '.addr')
	echo $name
	echo $addr
	echo "location /${name//\"}/ {
	proxy_pass http://${addr//\"}:8080/;
	proxy_set_header Upgrade \$http_upgrade;
	proxy_set_header Connection upgrade;
	proxy_set_header Accept-Encoding gzip;
	}
	" >> code-server.conf
	idx=$((idx+1))
done
echo "}" >> code-server.conf
cp ./code-server.conf /etc/nginx/sites-available
nginx -s reload
