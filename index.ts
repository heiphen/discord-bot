require('dotenv').config();
import { Intents, Client, Message } from "discord.js";
import { handleIncomingChannelCommand } from "./src/controllers/incomingMessageHandler";
import { handleMemberJoin } from "./src/helper/memberLogs";
import { COMMANDS } from "./src/utils/constants";
import { getDbClient } from "./src/utils/database";

const intents = new Intents(32767);

const client = new Client({ intents });

const createServer = async () => {

  const dbClient = await getDbClient();
  const db = dbClient.db("HeiphenBot");
  const userRoleCol = db.collection("UserRole");
  
  client.on("ready", () => console.log("Bot is online!"));
  
  
  client.on("messageCreate", async (message: Message) => {
  
    if (!message.author.bot) {
      if (message.content.split(" ")[0] == COMMANDS.prefix) {
        switch (message.channel.type) {
  
          case "GUILD_TEXT": {
            handleIncomingChannelCommand(message, userRoleCol);
            break;
          }
  
          default: {
            console.log(`❌  ${new Date().toISOString()}   error     ChannelNotSupported`);
          }
        }
      }
    }
  });
  
  client.on("guildMemberAdd", (member) => {
    console.log(member.guild.invites.cache);
    console.log(member.guild.roles.cache);
      handleMemberJoin(member);
    });
};

createServer();


client.login(process.env.TOKEN);

