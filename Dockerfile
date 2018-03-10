FROM golang:latest 
RUN mkdir /app 
ADD droneio /app/ 
WORKDIR /app 
RUN go build -o main . 
CMD ["/app/main"]