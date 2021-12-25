import { Message, MessageEmbed } from 'discord.js';
import { CONSTANTS } from '../utils/constants';
import { getDbClient } from '../utils/database';

export const handleGetCount = async (incomingMessage: Message) => {
  const dbClient = await getDbClient();
  const code = incomingMessage.content.split(/\s+/)[2];
  if (!code)
    return incomingMessage.channel?.send(
      `You forgot to mention the code it seems!`
    );
  const dbResult = await dbClient
    .db()
    .collection('user-role')
    .findOne({ code: code });
  if (!dbResult) return incomingMessage.channel?.send(`No such code found!`);

  incomingMessage.channel.send({
    embeds: [
      new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`Here's the current count!`)
        .addField('Code', code, true)
        .addField('Role Assigned', `<@&${dbResult.role}>`, true)
        .addField(
          'Users who used this code',
          dbResult.userIds.length + '',
          true
        )
        .setTimestamp()
        .setFooter(CONSTANTS.FOOTER),
    ],
  });
};
