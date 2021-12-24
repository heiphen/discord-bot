import { Channel, Message, MessageEmbed, TextChannel } from "discord.js";
import { Collection } from "mongodb";
import { nanoid } from "nanoid";
import { CONSTANTS } from "../utils/constants";

export const handleCreateCode = async (
  incomingMessage: Message,
  userRoleCol: Collection
) => {
  try {
    const userTypedRole = incomingMessage.content.split(/\s+/)[2];
    const code = nanoid().substr(0, 6);
    const newUser = await userRoleCol.findOne({
      userIds: { $all: [incomingMessage.author.id] },
      role: userTypedRole.substr(3, 18),
    });
    if (newUser) {
      incomingMessage.member?.send(
        `You have been assigned with this role already!`
      );
    } else {
        const availableRole = incomingMessage.guild?.roles.cache.find(role => role.id === userTypedRole.substr(3,18));
        if (availableRole && availableRole.id !== CONSTANTS.COMMUNITY_ROLE_ID) {
            const channel = incomingMessage.guild?.channels.cache.find(
                (ch: any) => ch.id === CONSTANTS.CODE_CHANNEL_ID
            ) as TextChannel;
            if (!channel) return;

        const read = await userRoleCol.insertOne({
          userIds: [],
          code: code,
          role: availableRole.id,
        });

        const msgEmbed = new MessageEmbed()
          .setColor("BLUE")
          .setTitle(`New Code`)
          .setDescription(
            `Hey <@${incomingMessage.author.id}>.\nYour code to get <@&${availableRole.id}> role is - ${code}\nKindly type the code in this channel itself to\n to get the role.`
          )
          .setTimestamp()
          .setFooter(CONSTANTS.FOOTER);

        channel.send({ embeds: [msgEmbed] });
      } else {
        incomingMessage.member?.send(`You entered invalid role type.`);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
