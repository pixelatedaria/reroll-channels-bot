const { SlashCommandBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');


const clientId = JSON.parse(fs.readFileSync("c")).client;  
const guildId = JSON.parse(fs.readFileSync("c")).guild; 
const commands = [
  new SlashCommandBuilder().setName('ping').setDescription("Gives you the bot's latency."),
  new SlashCommandBuilder().setName('reroll').setDescription("DEVELOPER COMMAND | Rerolls channel."),
]
  .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(JSON.parse(fs.readFileSync("c")).token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId), 
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
