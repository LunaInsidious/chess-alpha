FROM --platform=linux/amd64 golang:1.21-alpine
WORKDIR /go/src/app
COPY . .

RUN apk update && \
    apk add --update --no-cache git && \
    apk add --no-cache gcc && \
    apk add --no-cache musl-dev && \
    apk add --no-cache mariadb-dev && \
    wget https://github.com/golang-migrate/migrate/releases/download/v4.15.0/migrate.linux-amd64.tar.gz && \
    tar -zxvf migrate.linux-amd64.tar.gz && \
    mkdir -p /usr/local/bin && \
    mv migrate /usr/local/bin/migrate && \
    go get -u github.com/go-sql-driver/mysql

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags '-w -s' -o main ./main.go
CMD ["./main"]
