//@ts-nocheck
import { Message, MessageEmbed } from "discord.js";
import { CONSTANTS } from "../utils/constants";

export async function handleGetMemberCount(incomingMessage: Message) {
    try {
      const members = await incomingMessage.guild?.members.fetch({
        force: true,
      });
      const membersCount = members?.filter((m) => {
        return !m.user.bot;
      }).size;
      const botsCount = members?.filter((m) => {
        return m.user.bot;
      }).size;

      const memberCountEmbed = new MessageEmbed()
      .setTitle(`It's ${membersCount + botsCount}`)
      .setColor("GREEN")
      .setDescription(
        `I dove deep into the server and counted the members for you! 🌊`
      )
      .addField('Current Members', membersCount?.toString(), true)
      .addField('Current Bots', botsCount+'', true)
      .setTimestamp()
      .setFooter(CONSTANTS.FOOTER);

      incomingMessage.channel.send(
        { embeds: [memberCountEmbed] }
      );

      console.log(`✔️  ${new Date().toISOString()}   success  ${incomingMessage.content}`);

    } catch (err) {
        console.log(`❌  ${new Date().toISOString()}   ${err}  ${incomingMessage.content}`);  
    }
  };