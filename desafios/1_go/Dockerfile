# Build Stage
FROM golang:1.18 as build-stage

WORKDIR /app

COPY go.mod .
COPY main.go .

RUN go build -ldflags "-s -w" go-app .

# Final Stage 
FROM alpine:latest

WORKDIR /usr/src/app/

COPY --from=build-stage /app/go-app .

# Remover pacotes desnecessários
# Limpar o cache
RUN rm -rf /var/cache/apk/*

ENTRYPOINT [ "./go-app" ]
