FROM mysql/mysql-server:8.0

MAINTAINER FelixYin<ybkk1027@gmail.com>

WORKDIR ./

VOLUME /var/lib/mysql /etc/mysql/conf.d/

COPY auth.sql /docker-entrypoint-initdb.d/

COPY dump.sql /docker-entrypoint-initdb.d/

#RUN service mysql start

#RUN mysqldump -u root -p Ybkk1027 < /Dump20170325-2.sql

#RUN service mysql stop

EXPOSE 3306

