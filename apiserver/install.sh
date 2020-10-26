#!/bin/bash
if [ -z $(which nginx) ]
then
	apt install nginx -y
else
	echo "nginx aleady installed"
fi
sed -i 's/listen 80 default_server;/listen 8989 default_server;/' /etc/nginx/sites-available/default
sed -i 's/listen \[::\]:80 default_server;/listen \[::\]:8989 default_server;/' /etc/nginx/sites-available/default

if [ -z $(which nodejs) ]
then
	apt install nodejs -y
else
	echo "nodejs aleady installed"
fi
if [ -z $(which npm) ]
then
	apt install npm -y
else
	echo "npm aleady installed"
fi
npm install json-server --save-dev
touch /etc/nginx/sites-available/code-server.conf
ln -s /etc/nginx/sites-available/code-server.conf /etc/nginx/sites-enabled/code-server.conf
systemctl restart nginx

if [ -z $(which inotifywait) ]
then
	apt install inotify-tools -y
else
	echo "inotify aleady installed"
fi
if [ -z $(which jq) ]
then
	apt install jq -y
else
	echo "jq aleady installed"
fi

nohup npm start&
nohup ./inotify-db.sh
