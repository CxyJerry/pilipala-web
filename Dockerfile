# 使用官方的Node.js镜像作为基础镜像
FROM node:14 AS build-stage

# 设置工作目录
WORKDIR /app

# 复制package.json和yarn.lock（或者npm-shrinkwrap.json）到容器中
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制Vue.js项目的所有文件到容器中
COPY . .

# 构建Vue.js项目
RUN npm run build

# 使用Nginx镜像作为最终镜像
FROM nginx:latest

# 将构建好的静态文件复制到Nginx的默认静态文件目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 容器运行时暴露的端口号
EXPOSE 8888

# 容器启动时运行Nginx服务
CMD ["nginx", "-g", "daemon off;"]
