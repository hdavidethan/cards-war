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

## API Endpoints

When running the server, RESTful API endpoints are exposed that allow you to perform
the same actions on an HTTP request directly.

`POST /api/game`
This creates a new game and simulates it.

Request Body

- players: [string, string] - The names of the two players
- gameType: "WAR"
  - This is to anticipate the addition of multiple game types.

`GET /api/game`
This retrieves the basic information about every game.

`GET /api/game/[id]`
This retrieves the information about a specific game as well as it's turn-by-turn history

Path Params

- id: The ID of the game

`GET /api/player_stat`
This retrieves the win and loss stats for a given player or all players

Query Params

- playerName: The name of the player. If this is not defined, all player stats are returned instead

## Future Tasks

- More proper tests for the game behavior.
- Extensible design for multiple kinds of card games
- Support for real-time playing by human players
