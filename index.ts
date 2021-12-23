require("dotenv").config();
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
        const newUser = await userRoleCol.findOne({ code: message.content });
        if (newUser) {
          let userIdInArray = false;
          for (let i = 0; i < newUser.userIds.length; i++) {
            if (newUser.userIds[i] === message.author.id) {
              userIdInArray = true;
            }
          }
          if (!userIdInArray) {
            const roleToAssign: string = newUser.role;
            if (roleToAssign) {
              userRoleCol.findOneAndUpdate(
                { code: message.content },
                { $set: { userIds: [...newUser.userIds, message.author.id] } }
              );
              const role = message.guild?.roles.cache.find(
                (role) => role.id === roleToAssign
              );
              if (!role) return;
              // @ts-ignore
              message?.guild?.members?.cache
                .get(message?.author?.id)
                .roles.add(role);
              const messages = await message.channel.messages.fetch({
                limit: 3,
              });

              if (message.channel.type === "GUILD_TEXT")
                message.channel.bulkDelete(messages);

              message.channel.send(
                `<@${message.author.id}> You have been assigned <@&${role?.id}> role.`
              );
            }
          } else {
            message.member?.send(`Your code is incorrect.`);
          }
        }
      }
      if (message.channelId === CONSTANTS.INTRODUCE_CHANNEL_ID) {
        const role = message.guild?.roles.cache.find(role => role.id === CONSTANTS.COMMUNITY_ROLE_ID);
        message.guild?.members.cache.get(message.author.id).roles.add(role);
        message.member?.send(`<@${message.author.id}> you have been assigned community role.`);
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
