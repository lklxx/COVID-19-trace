FROM golang:1.16-alpine

ADD . /store

WORKDIR /store

RUN go get .
RUN go build -o store-service main.go

EXPOSE 9090
ENTRYPOINT [ "./store-service" ]