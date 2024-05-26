# Valorant Custom Game Lobby Discord Bot

## Overview

This Discord bot facilitates the creation and management of custom game lobbies within a Discord server. It allows users to initialize a lobby, create two randomized teams of 5 players, automatically move them into separate voice channels (Attacker/Defender), move all players back to a waiting room, and remove the lobby when it's no longer needed.

### Features

- Initialize a Lobby: Set up a custom game lobby with predefined voice channels.

- Create Randomized Teams: Randomly assign 10 players into two teams (Attacker/Defender).

- Auto-move Players: Automatically move players into their respective team voice channels.

- Move Players to Waiting Room: Move all players back to the waiting room channel.

- Remove Lobby: Delete the custom game lobby from the server.

### Getting Started

##### Prerequisites

- Node.js (version 12 or higher)
- MongoDB (for database)
- Discord account with permissions to manage channels and roles in the server

##### Installation

1. Clone the repository
```bash 
git clone https://github.com/notkoyo/valo_dc_bot.git

cd valo_dc_bot
```

2. Install all dependencies
```bash 
npm install
```

3. Create a .env in the root directory and add necessary token, IDs and your MongoDB URI.
```env 
TOKEN = YOUR_DISCORD_BOT_TOKEN
GUILD_ID = YOUR_GUILD_ID
CLIENT_ID = YOUR_CLIENT_ID
MONGODB_URI = YOUR_MONGODB_URI
```

4. Edit config.json file to include your test server ID, client ID and include any user IDs in the devs array to allow access to the "Dev Only" functionality.
```json
{
  "testServer": "1234567890123456789",
  "clientId": "1234567890123456789",
  "devs": ["1234567890123456789"]
}
```

5. Start the bot in the terminal.
```bash
npm run start:dev
```

##### Commands

- Ping the bot to check for a valid connection.
```diff
/ping
```

- Initalize a lobby: Creates parent category and all channels as children.
```diff
/initlobby
```

- Creates randomized teams and randomly assign 10 players into two teams (Attacker/Defender).
```diff
/maketeams
```

- Move all players within Attacker/Defender channels back to the waiting room channel.
```diff
/movetowait
```

- Delete the entire lobby from the Discord server.
```diff
/rmlobby
```

##### Configuration

The bot uses a MongoDB database to store information about the lobby and player assignments. Make sure your MongoDB database is running and accessible via the URI provided in the .env file.

### Technologies Used
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [discord.js](https://discord.js.org)
- [MongoDB](https://mongodb.com)
- [Mongoose](https://mongoosejs.com)
- [Dotenv](https://dotenv.org)
- [Nodemon](https://nodemon.io/)

### Contact
For any questions or suggestions, please feel free to reach out to me on Discord: @koyodev.

### Enjoy your valorant custom games! 🎮