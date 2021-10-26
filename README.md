# Play Session Feedback App

A serice and web client for recording feedback about play sessions.

## Setup

This project was built on NodeJS `v17.0.1` and npm `8.1.0`.

`npm` is required but versions other than stated above have not been tested.

Install packages in both the top level directory and `frontend` directory.

```
npm install
cd frontend
npm install
```

## How to run

### Start the REST service

In the top level directory (the same directory as the README.md):

```
npm start
```

By default the service will listen to port `3000` (`http://localhost:3000`). This can be changed in `app.js`.

### Start the web client

The web client is a separate build inside the `frontend` directory.

In `frontend`

```
npm start
```

- Play session feedback form `http://localhost:8080`
- Ops interface `http://localhost:8080/ops`

## Running Tests

In top level directory.

```
npm test
```
