
import { MessageEmbed } from "discord.js";
import { CONSTANTS } from "./constants";


export const createBasicEmbed = (
    msg: { title: string, message: string }) => {
    return new MessageEmbed()
      .setColor("BLUE")
      .setTitle(msg.title)
      .setDescription(msg.message)
      .setTimestamp()
      .setFooter(CONSTANTS.FOOTER);
  };

  export const membersCountMessage = (membersCount: string, botCount: string) => {
    return new MessageEmbed()
      .setTitle(`It's ${+membersCount + +botCount}`)
      .setColor("GREEN")
      .setDescription(
        `I dove deep into the server and counted the members for you! 🌊`
      )
      .addField('Current Members', membersCount, true)
      .addField('Current Bots', botCount, true)
      .setTimestamp()
      .setFooter(CONSTANTS.FOOTER);
  };