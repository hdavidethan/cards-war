# War Card Game

## Getting Started

### 1. Running with Next.js locally

First, you must have Node.js installed. Ideally use the LTS version.
Then, install the dependencies

```
npm install
```

Then, create a .env file from .env.example to fill in the values.
The Database URL in the example file has access to the db.

Set the `OUTPUT` env variable to "export"

```
npm run dev
```

### 2. Docker

Create a .env file from .env.example to fill in the values.
The Database URL in the example file has access to the db.

Comment out the `OUTPUT` variable in the .env file

```
docker build -t cards-war .
docker run -p 3000:3000 cards-war
```

### 3. Production Deployment

A production deployment is also available on Vercel at:
https://cards-war.vercel.app/
