FROM golang:1.16-alpine

ADD . /fetch

WORKDIR /fetch

RUN go get .
RUN go build -o fetch-service main.go

EXPOSE 9090
ENTRYPOINT [ "./fetch-service" ]