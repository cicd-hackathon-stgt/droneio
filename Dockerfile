FROM alpine:3.7

COPY ./droneio /app/droneio

ENTRYPOINT ["/app/droneio"]
