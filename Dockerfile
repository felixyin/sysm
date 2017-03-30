#设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM node

MAINTAINER felixyin<ybkk1027@gmail.com>

WORKDIR /usr/src/node/sysm

RUN apt-get update; \
    apt-get -y upgrade

RUN apt-get -y install git

RUN npm install bower -g

#编译运行node项目，使用npm安装程序的所有依赖,利用taobao的npm安装

RUN mkdir -p /usr/src/node; \
    cd /usr/src/node; \
    git clone https://github.com/felixyin/sysm.git -b master; \
    cd sysm; \
    bower install;\
    npm install --registry=https://registry.npm.taobao.org;\


#暴露container的端口
EXPOSE 8080

#运行命令
CMD ["npm", "run", "my-start"]
