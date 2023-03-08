FROM golang:1.20.2 AS build

RUN mkdir /build
ADD . /build/
WORKDIR /build

RUN CGO_ENABLED=0 go build

FROM scratch

WORKDIR /app

COPY --from=build /build/hello /app/

CMD ["./hello"]
