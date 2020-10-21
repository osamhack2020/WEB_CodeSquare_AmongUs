FROM mariadb:10.4.6

COPY utf8.cnf /etc/mysql/conf.d/
COPY initdb.sql /docker-entrypoint-initdb.d/