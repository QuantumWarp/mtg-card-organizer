# THIS DOCKERFILE REQUIRES PROJECT TO BE BUILT WITH
# npm run build -- --configuration=production
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html/
