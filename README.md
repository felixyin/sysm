# sysm
兴瑞实验室管理系统

运行环境：docker 17.03.1

1. 安装mysql、redis依赖：
  - 安装mysql和初始化数据库，参照docker/mysql/readme.md
  - 安装redis，参照docker/redis/readme.md
  
2. 运行项目：
  - cd [root目录]
  - 编译镜像：docker build -t felixyin/sysm ./
  - 运行：docker run  -d --name sysm-node -p 8081:8080 --link sysm-mysql:db --link sysm-redis:redis felixyin/sysm:latest
  
> 第二种运行项目的方法：
>  - docker pull felixyin/sysm
>  - docker run  -d --name sysm-node -p 8081:8080 --link sysm-mysql:db --link sysm-redis:redis felixyin/sysm:latest
  
