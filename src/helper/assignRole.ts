import { Message } from "discord.js";
import { Collection } from "mongodb";


export const handleAssignRole = async (incomingMessage: Message, userRoleCol: Collection) => {
    try {
        const code = incomingMessage.content.split(" ")[2];
        const newUser = await userRoleCol.findOne({id: incomingMessage.author.id});
        console.log(newUser);
        if (newUser) {
            if (newUser.code === code) {
                //console.log(incomingMessage.guild?.roles.cache);
                const roleToAssign: string = newUser.role;
                console.log(roleToAssign);
                if (roleToAssign) {
                    const role = incomingMessage.guild?.roles.cache.find(role => role.name === roleToAssign);
                    incomingMessage.guild?.members.cache.get(incomingMessage.author.id).roles.add(role);
                    incomingMessage.member?.send(`You have been assigned ${roleToAssign} role.`);
                }
            } else {
                incomingMessage.member?.send(`Your code is incorrect.`);
            }
        }
        await userRoleCol.deleteOne({id: incomingMessage.author.id});
    } catch (err) {
        console.log(err);
    }
};