FROM golang:1.16-alpine

ADD . /trace-store

WORKDIR /trace-store

RUN go get .
RUN go build -o trace-store-service main.go

EXPOSE 9090
ENTRYPOINT [ "./trace-store-service" ]