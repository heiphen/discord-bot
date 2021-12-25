import { getDbClient } from '../utils/database';

export async function assignRoleByCode(message: any) {
  const dbClient = await getDbClient();

  const newUser = await dbClient
    .db()
    .collection('user-role')
    .findOne({ code: message.content });
  if (newUser) {
    let userIdInArray = false;
    for (let i = 0; i < newUser.userIds.length; i++) {
      if (newUser.userIds[i] === message.author.id) {
        userIdInArray = true;
      }
    }
    if (!userIdInArray) {
      const roleToAssign: string = newUser.role;
      if (roleToAssign) {
        dbClient
          .db()
          .collection('user-role')
          .findOneAndUpdate(
            { code: message.content },
            { $set: { userIds: [...newUser.userIds, message.author.id] } }
          );
        const role = message.guild?.roles.cache.find(
          (role: any) => role.id === roleToAssign
        );
        if (!role) return;
        message?.guild?.members?.cache.get(message?.author?.id).roles.add(role);
        const messages = await message.channel.messages.fetch({
          limit: 3,
        });

        if (message.channel.type === 'GUILD_TEXT')
          message.channel.bulkDelete(messages);

        message.channel.send(
          `<@${message.author.id}> You have been assigned <@&${role?.id}> role.`
        );
      }
    } else {
      message.member?.send(`Your code is incorrect.`);
    }
  }
}
