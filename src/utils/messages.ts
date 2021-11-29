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