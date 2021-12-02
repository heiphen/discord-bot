import { Message } from "discord.js";
import { Collection } from "mongodb";
import { nanoid } from "nanoid";


export const handleCreateCode = async (incomingMessage: Message, userRoleCol: Collection) => {
    try {
        const userTypedRole = incomingMessage.content.split(" ")[2];
        const code = nanoid().substr(0,6);
    const newUser = await userRoleCol.findOne({id: incomingMessage.author.id});
    if (newUser) {
        incomingMessage.member?.send(`Your code has already been generated ans sent to you. Please check again!`);
    } else {
        const availableRole = incomingMessage.guild?.roles.cache.find(role => role.name === userTypedRole);
        console.log(availableRole);
        if (availableRole) {
            const read = await userRoleCol.insertOne(
                {
                    id: incomingMessage.author.id,
                    code: code,
                    role: availableRole.name,
                });
            incomingMessage.member?.send(`Your code is - ${code}`);
        } else {
            incomingMessage.member?.send(`You entered invalid role type.`);
        }
    }  
    } catch(err) {
        console.log(err);
    }   
};