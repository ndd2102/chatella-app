FROM registry.access.redhat.com/ubi8/nodejs-20 as build
USER 0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
USER 1001
FROM registry.access.redhat.com/ubi8/nginx-122
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf  /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]