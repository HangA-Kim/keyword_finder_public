FROM nginx:1.23-alpine AS runner

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# COPY ./default.conf /etc/nginx/conf.d/
# COPY ./nginx.conf /etc/nginx/
# COPY ./mime.types /etc/nginx/
# COPY ./convert-nginx.sh /etc/nginx/

# RUN chmod +x /etc/nginx/convert-nginx.sh

EXPOSE 80