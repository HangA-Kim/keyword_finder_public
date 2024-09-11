FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/public /usr/share/nginx/html
COPY --from=builder /app/.next /usr/share/nginx/html/.next
