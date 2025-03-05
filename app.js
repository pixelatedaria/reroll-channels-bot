const { Client, GatewayIntentBits, SlashCommandBuilder } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const fs = require("fs");

const ids = [
    "1345945973033009173",
    "1345944809319305276",
    "1345944820564365354",
    "1345944830756257843",
    "1345944843939090452",
    "1345945913520033915",
    "1345945924949643334",
    "1345945937243279391",
    "1345945949817540689",
    "1345945959498121268"
];

const allowedUsers = [
    "1274838852967731224",
    "1274838039499112520"
]
let timer = 60 * 10;
let prev = -1;
let r = 1;

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag} with ID: ${client.user.id}`);
    for (const id of ids) console.log((await client.channels.fetch(id)).name);

    setInterval(async () => {
        if (timer <= 0) {
            timer = 60 * 10;
            while (prev === r){r = Math.floor(Math.random() * ids.length);}
            prev = r;
            console.log(`Selected channel: ${ids[r]}`);

            for (const id of ids) {
                const cn = await client.channels.fetch(id);
                await cn.permissionOverwrites.edit(cn.guild.roles.everyone, { ViewChannel: id === ids[r] });
            }
        }
        timer--;
    }, 1000);
});

//client.on("messageCreate", async (msg) => {
  //  if (!msg.guild || msg.author.bot) return;
   // if (msg.content === "-reroll" && msg.author.id === "1274838852967731224") timer = 0;
//});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
  
    const { commandName } = interaction;
  
    if (commandName === 'ping') {
        const startTime = Date.now(); 
        await interaction.reply({ content: '🏓 Pinging...', fetchReply: true, ephemeral: true, }); 
        const latency = Date.now() - startTime;
    
        await interaction.editReply(`🏓 Pong! Latency: **${latency}ms** | WebSocket: **${client.ws.ping}ms**`);
      } else if (interaction.commandName === "reroll") {
        if (!allowedUsers.includes(interaction.user.id)) {
          return await interaction.reply({ content: "❌ You are not allowed to use this command.", ephemeral: true });
        }
    
        await interaction.reply("✅ Timer Rerolled!");
        timer = 0;
      }
    }
  );

client.login(JSON.parse(fs.readFileSync("c")).token);



