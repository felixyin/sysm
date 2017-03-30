# 设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM node:7.7.4

MAINTAINER felixyin<ybkk1027@gmail.com>

WORKDIR /usr/src/node/sysm

# 基础镜像中已经安装基本工具和运行时
#RUN apt-get update; \
#    apt-get -y upgrade

#RUN apt-get -y install git

# 安装npm模块
RUN npm install pm2 bower -g --registry=https://registry.npm.taobao.org;

# clone github上项目源码，安装依赖库
RUN mkdir -p /usr/src/node; \
    cd /usr/src/node; \
    git clone https://github.com/felixyin/sysm.git -b master; \
    cd sysm; \
    bower install;\
    npm install --registry=https://registry.npm.taobao.org;

#--registry=https://registry.npm.taobao.org;

# 暴露container的端口
EXPOSE 8080

# 启动应用
CMD pm2 start index -i 3 --no-daemon
