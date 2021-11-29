require('dotenv').config();
import { Intents, Client } from "discord.js";
import { handleMemberJoin } from "./src/helper/memberLogs";

const intents = new Intents(32767);

const client = new Client({ intents });

client.on("ready", () => console.log("Bot is online!"));

client!.on("guildMemberAdd", (member) => {
    handleMemberJoin(member, client);
  });



client.login(process.env.TOKEN);
