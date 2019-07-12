1. Copy `example.env` to `.env`.
2. Populate all environment variables. When creating a Discord application and bot to populate the `DISCORD_TOKEN` variable, also make note of the Client ID.
3. Add bot to your Discord server by navigating to: https://discordapp.com/oauth2/authorize?client_id=DISCORD_CLIENT_ID&scope=bot&permissions=3072.
4. Run `heroku local`.
5. The bot should now appear Online.
