require('dotenv').config();
import { Intents, Client, Message } from "discord.js";
import { handleIncomingChannelCommand } from "./src/controllers/incomingMessageHandler";
import { handleMemberJoin } from "./src/helper/memberLogs";
import { COMMANDS, CONSTANTS } from "./src/utils/constants";
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
      if (message.content.split(/\s+/)[0] == COMMANDS.prefix) {
        switch (message.channel.type) {
  
          case "GUILD_TEXT": {
            handleIncomingChannelCommand(message, userRoleCol);
            break;
          }
  
          default: {
            console.log(`error     ChannelNotSupported`);
          }
        }
      }
      if (message.channelId === CONSTANTS.CODE_CHANNEL_ID) {
        const newUser = await userRoleCol.findOne({id: message.author.id});
        if (newUser) {
            if (newUser.code == message.content) {
                const roleToAssign: string = newUser.role;
                if (roleToAssign) {
                    const role = message.guild?.roles.cache.find(role => role.name === roleToAssign);
                    message.guild?.members.cache.get(message.author.id).roles.add(role);
                    const messages = await message.channel.messages.fetch({limit: 3})

                    if (message.channel.type === "GUILD_TEXT") message.channel.bulkDelete(messages);
                    
                    message.channel.send(`<@${message.author.id}> You have been assigned <@&${role?.id}> role.`);
                }
            } else {
                message.member?.send(`Your code is incorrect.`);
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

