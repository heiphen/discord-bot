import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { customAlphabet, nanoid } from 'nanoid';
import { CONSTANTS } from '../utils/constants';
import { getDbClient } from '../utils/database';

export const handleCreateCode = async (incomingMessage: Message) => {
  try {
    const dbClient = await getDbClient();
    const userRole = incomingMessage.content.split(/\s+/)[2];
    const code = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6)();
    const found = await dbClient.db().collection('user-role').findOne({
      role: userRole,
    });
    if (!incomingMessage.member?.roles.cache.has(CONSTANTS.ADMIN_ROLE_ID))
      return incomingMessage.channel?.send('You are not authorized to use this command');

    if (found)
      return incomingMessage.channel?.send(
        `Hey <@${incomingMessage.author.id}>.\nYour code to get <@&${found.code}> role is - ${code}\n PS: It existed, so didn't create new one`
      );
      
    if (!userRole)
      return incomingMessage.channel?.send('You missed out mentioning a role');

    const availableRole = incomingMessage.guild?.roles.cache.find(
      (role) => role.id === userRole.substr(3, 18)
    );
    if (!availableRole) return incomingMessage.channel?.send('Invalid role');
    const channel = incomingMessage.guild?.channels.cache.find(
      (ch: any) => ch.id === CONSTANTS.CODE_CHANNEL_ID
    ) as TextChannel;
    if (!channel) return;

    await dbClient.db().collection('user-role').insertOne({
      userIds: [],
      code: code,
      role: availableRole.id,
    });

    channel.send({
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
  } catch (err) {
    console.log(err);
  }
};
