FROM golang:1.16-alpine

ADD . /match

WORKDIR /match

RUN go get .
RUN go build -o match-service main.go

EXPOSE 9090
ENTRYPOINT [ "./match-service" ]