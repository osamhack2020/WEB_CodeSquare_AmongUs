FROM mariadb:10.4.6

COPY . /etc/mysql/conf.d/
COPY . /docker-entrypoint-initdb.d/