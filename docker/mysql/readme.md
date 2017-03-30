
在当前目录运行：

1. 创建镜像 : 

docker build -t felixyin/sysm-mysql ./

需要将felixyin/sysm-mysql 替换为你的镜像名称

2. 启动

docker run --name sysm-mysql -p 3307:3306 -v /Users/fy/workspace/webstorm/sysm/docker/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=Ybkk1027 -d felixyin/sysm-mysql

需要将/Users/fy/workspace/webstorm/sysm/docker/mysql/data替换为data目录在你磁盘的绝对路径
需要将felixyin/sysm-mysql替换为你的颈项名称

