FROM nginx:1.23-alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file
COPY ./nginx/kf_nginx.conf /etc/nginx/nginx.conf


# WORKDIR /usr/share/nginx/html

# RUN rm *
# Copy the built Next.js app
# COPY --from=build /app/.next /usr/share/nginx/html/.next
# COPY --from=build /app/public /usr/share/nginx/html/public


# Copy the built Next.js app and public directory
# COPY --from=build /app/.next/standalone ./.next
# COPY --from=build /app/.next/static ./.next/static
# COPY --from=build /app/public ./public

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]