require('dotenv').config();
import { Intents, Client, Message } from "discord.js";
import { handleIncomingChannelCommand } from "./src/controllers/incomingMessageHandler";
import { handleMemberJoin } from "./src/helper/memberLogs";
import { COMMANDS } from "./src/utils/constants";
import { serverLogger } from "./src/utils/logger";

const intents = new Intents(32767);

const client = new Client({ intents });

client.on("ready", () => console.log("Bot is online!"));

client!.on("messageCreate", async (message: Message) => {
  /******************************************
        Check if input is by Human
  *******************************************/
  if (!message.author.bot) {
    if (message.content.split(" ")[0] == COMMANDS.prefix) {
      switch (message.channel.type) {
        /******************************************
                      Text channel
        *******************************************/
        case "GUILD_TEXT": {
          //check for our command
          handleIncomingChannelCommand(message);

          break;
        }

        default: {
          serverLogger(
            "user-error",
            "ChannelNotSupported",
            "Channel Not Supported"
          );
        }
      }
    }
  }
});

client!.on("guildMemberAdd", (member) => {
    handleMemberJoin(member, client);
  });



client.login(process.env.TOKEN);
