FROM nginx:1.23-alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/default.conf

RUN ls -l kf_nginx.conf
# Copy the custom Nginx configuration file
COPY kf_nginx.conf /etc/nginx/nginx.conf

RUN ls -l /etc/nginx/nginx.conf



# WORKDIR /usr/share/nginx/html

# RUN rm *
# Copy the built Next.js app
# COPY --from=build /app/.next /usr/share/nginx/html/.next
# COPY --from=build /app/public /usr/share/nginx/html/public


# Copy the built Next.js app and public directory
# COPY --from=builder /app/.next/standalone ./.next
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/public ./public

EXPOSE 80

# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]