import { Message, MessageEmbed } from 'discord.js';
import { CONSTANTS } from '../utils/constants';

export async function handleGetMemberCount(incomingMessage: Message) {
  const members = await incomingMessage.guild?.members.fetch({
    force: true,
  });
  const membersCount =
    members?.filter((m) => {
      return !m.user.bot;
    }).size || 0;
  const botsCount =
    members?.filter((m) => {
      return m.user.bot;
    }).size || 0;

  const memberCountEmbed = new MessageEmbed()
    .setTitle(`We're ${membersCount + botsCount}s strong!`)
    .setColor('BLUE')
    .setDescription(
      `Deep down in the sea, found these many precious stones! 🌊`
    )
    .addField('Total Members', membersCount?.toString(), true)
    .addField('Total Bots', botsCount + '', true)
    .setTimestamp()
    .setFooter(CONSTANTS.FOOTER);

  incomingMessage.channel.send({ embeds: [memberCountEmbed] });
}
