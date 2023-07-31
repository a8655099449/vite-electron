# user = 用户名
# server = 服务器IP

scp -o "StrictHostKeyChecking=no" -r  ./dist/* root@47.107.81.99:/www/wwwroot/music-web
