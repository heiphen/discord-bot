import { Channel, Message, MessageEmbed, TextChannel } from "discord.js";
import { Collection } from "mongodb";
import { nanoid } from "nanoid";
import { CONSTANTS } from "../utils/constants";


export const handleCreateCode = async (incomingMessage: Message, userRoleCol: Collection) => {
    try {
        const userTypedRole = incomingMessage.content.split(/\s+/)[2];
        const code = nanoid().substr(0,6);
    const newUser = await userRoleCol.findOne({id: incomingMessage.author.id});
    if (newUser) {
        incomingMessage.member?.send(`Your code has already been generated and sent to you. Please check again!`);
    } else {
        const availableRole = incomingMessage.guild?.roles.cache.find(role => role.id === userTypedRole.substr(3,18));
        if (availableRole) {
            const channel = incomingMessage.guild.channels.cache.find(
                (ch: any) => ch.id === CONSTANTS.CODE_CHANNEL_ID
            ) as TextChannel;
            if (!channel) return;

            const read = await userRoleCol.insertOne(
                {
                    id: incomingMessage.author.id,
                    code: code,
                    role: availableRole.id,
                });

            const msgEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`New Code`)
            .setDescription(`Hey <@${incomingMessage.author.id}>.\nYour code to get <@&${availableRole.id}> role is - ${code}\nKindly type the code in this channel itself to\n to get the role.`)
            .setTimestamp()
            .setFooter(CONSTANTS.FOOTER);
            
            channel.send(
                { embeds: [msgEmbed] }
            )
        } else {
            incomingMessage.member?.send(`You entered invalid role type.`);
        }
    }  
    } catch(err) {
        console.log(err);
    }   
};