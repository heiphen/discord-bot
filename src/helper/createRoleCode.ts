import { Message, MessageEmbed } from 'discord.js';
import { customAlphabet } from 'nanoid';
import { CONSTANTS } from '../utils/constants';
import { getDbClient } from '../utils/database';

export const handleCreateCode = async (incomingMessage: Message) => {
  const dbClient = await getDbClient();
  const userRole = incomingMessage.content.split(/\s+/)[2];
  if (!userRole)
    return incomingMessage.channel?.send('You missed out mentioning a role');

  const availableRole = incomingMessage.guild?.roles.cache.find(
    (role) => role.id === userRole.substr(3, 18)
  );
  if (!availableRole) return incomingMessage.channel?.send('Invalid role');

  const code = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6)();

  await dbClient.db().collection('user-role').insertOne({
    userIds: [],
    code: code,
    role: availableRole.id,
  });

  incomingMessage.channel.send({
    embeds: [
      new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`New Code`)
        .setDescription(
          `Hey <@${incomingMessage.author.id}>.\nYour code to get <@&${availableRole.id}> role is - ${code}\n`
        )
        .setTimestamp()
        .setFooter(CONSTANTS.FOOTER),
    ],
  });
};
