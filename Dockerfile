FROM alpine:3.7

COPY ./dist /app/dist

ENTRYPOINT ["/app/dist/index.html"]
