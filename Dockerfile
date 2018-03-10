FROM golang:latest 
RUN mkdir /app 
ADD droneio /app/ 
ENTRYPOINT  ["/app/droneio"]