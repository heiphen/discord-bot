require('dotenv').config();
import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { CONSTANTS } from '../utils/constants';

export function handleMemberJoin(member: GuildMember) {
  try {
    const channel = member.guild.channels.cache.find(
      (ch: any) => ch.id === CONSTANTS.LOGGER_CHANNEL_ID
    ) as TextChannel;

    const role = member.guild?.roles.cache.find(
      (role: any) => role.id == CONSTANTS.UNASSIGNED_ROLE_ID
    );
    if (role) member.roles.add(role);

    if (channel) {
      const msgEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`A new member joined the server 🥳!`)
        .setDescription(
          `Welcome <@${
            member.id
          }> to the server!\nPlease visit ${member.guild.channels.cache.get(
            CONSTANTS.INTRODUCE_CHANNEL_ID
          )} and introduce yourself, to unlock the server`
        )
        .setTimestamp()
        .setFooter(CONSTANTS.FOOTER);
      channel.send({ embeds: [msgEmbed] });
    }

    member.send(
      `Welcome <@${
        member.id
      }> to the Heiphen server! Please visit ${member.guild.channels.cache.get(
        CONSTANTS.INTRODUCE_CHANNEL_ID
      )} and introduce yourself, to unlock the server`
    );
  } catch (err) {
    console.log(`${err}    InternalError`);
  }
}
