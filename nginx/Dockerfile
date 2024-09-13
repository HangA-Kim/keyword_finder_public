FROM nginx:1.23-alpine AS runner

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy the custom Nginx configuration file
COPY ./nginx/kf_nginx.conf /etc/nginx/nginx.conf
COPY ./mime.types /etc/nginx/

EXPOSE 80
