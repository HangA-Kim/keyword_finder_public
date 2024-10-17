FROM nginx:1.23-alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/default.conf

RUN ls -al ./
COPY kf_nginx.conf /etc/nginx/conf.d/default.conf

RUN ls -l /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]