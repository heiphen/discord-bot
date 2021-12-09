import { Message, MessageEmbed } from "discord.js";
import { Collection } from "mongodb";
import { CONSTANTS } from "../utils/constants";


export const handleGetCount = async (incomingMessage: Message, userRoleCol: Collection) => {
    try {
        const code = incomingMessage.content.split(/\s+/)[2];
        const codeDoc = await userRoleCol.findOne({ code: code});
        if (codeDoc) {
            const usersNumber: Number = codeDoc.userIds.length; 
            const role = `<@&${codeDoc.role}>`;

            const msgEmbed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`Here's the current count!`)
            .addField("Code", code , true)
            .addField("Role Assigned", role, true)
            .addField("Users who used this code", usersNumber+"", true)
            .setTimestamp()
            .setFooter(CONSTANTS.FOOTER);

            incomingMessage.channel.send({
                embeds: [msgEmbed]
            });
        } else {
            incomingMessage.member?.send(`I found no such code generated by me!`);
        }
    } catch (err) {
        console.log(err);
    }
};