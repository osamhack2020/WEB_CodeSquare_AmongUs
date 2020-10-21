#!/bin/bash

idx=0

rm -f ./code-server.conf
echo "server {
listen 8989;
listen [::]:8989;
server_name 3.235.236.245;" >> code-server.conf

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
