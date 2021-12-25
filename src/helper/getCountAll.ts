import { Message, MessageEmbed } from 'discord.js';
import { CONSTANTS } from '../utils/constants';
import { getDbClient } from '../utils/database';

export const handleGetCountAll = async (incomingMessage: Message) => {
  try {
    const dbClient = await getDbClient();
    await dbClient
      .db()
      .collection('user-role')
      .find({})
      .toArray((err, res) => {
        if (err) throw err;
        if (!res) return;
        let fields = [];
        let totalCount = 0;

        for (let i = 0; i < res?.length; i++) {
          const field1 = {
            name: '\u200B',
            value: `${res[i].code}`,
            inline: true,
          };
          const field2 = {
            name: '\u200B',
            value: `<@&${res[i].role}>`,
            inline: true,
          };
          const field3 = {
            name: '\u200B',
            value: `${res[i].userIds.length}`,
            inline: true,
          };

          fields.push(field1, field2, field3);
          totalCount += res[i].userIds.length;
        }

        const msgEmbed = new MessageEmbed()
          .setColor('BLUE')
          .setTitle(`Total Count - ${totalCount}`)
          .setDescription(`Below is the detailed info for each code.`)
          .addFields([
            { name: 'Code', value: '------', inline: true },
            { name: 'Role Assigned', value: '-----------------', inline: true },
            {
              name: 'Users who used this code',
              value: '------------------------------',
              inline: true,
            },
            ...fields,
          ])
          .setTimestamp()
          .setFooter(CONSTANTS.FOOTER);

        incomingMessage.channel.send({
          embeds: [msgEmbed],
        });
      });
  } catch (err) {
    console.log(err);
  }
};
