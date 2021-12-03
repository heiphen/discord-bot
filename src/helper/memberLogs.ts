require("dotenv").config()
import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { CONSTANTS } from "../utils/constants";

export function handleMemberJoin(
    member: GuildMember,
  ) {
    try {
      const channel = member.guild.channels.cache.find(
        (ch: any) => ch.id === process.env.LOGGER_CHANNEL_ID
      ) as TextChannel;
      if (!channel) return;

      const msgEmbed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle(`A new member joined the server 🥳!`)
      .setDescription(`Welcome <@${member.id}> to the server!\nPlease check out ${member.guild.channels.cache.get('914591677551902740')} for more info.`)
      .setTimestamp()
      .setFooter(CONSTANTS.FOOTER);
      channel.send(
        { embeds: [msgEmbed] }
      );

      member.send(
        `Welcome <@${member.id}> to the Heiphen server! Please check out ${member.guild.channels.cache.get('914591677551902740')} for more info.`
      );
    } catch (err) {
      console.log(`❌  ${new Date().toISOString()}   ${err}    InternalError`);
    }
};

