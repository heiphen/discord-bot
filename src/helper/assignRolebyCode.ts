import { getDbClient } from '../utils/database';

export async function assignRoleByCode(message: any) {
  const dbClient = await getDbClient();

  const code = await dbClient
    .db()
    .collection('user-role')
    .findOne({ code: message.content });
  if (!code)
    return message.member?.send(
      `It seems you have entered the incorrect code. Please enter the code provided by Heiphen team correctly and try again!`
    );

  const found = code.userIds.find(
    (element: any) => element === message.author.id
  );
  if (found) return message.member?.send('You have already redeemed the code.');

  const role = message.guild?.roles.cache.find(
    (role: any) => role.id === code.role
  );
  if (!role) return;

  message?.guild?.members?.cache.get(message?.author?.id).roles.add(role);

  await dbClient
    .db()
    .collection('user-role')
    .findOneAndUpdate(
      { code: message.content },
      { $set: { userIds: [...code.userIds, message.author.id] } }
    );

  message.delete();

  message.member.send(
    `<@${message.author.id}> You have redeemed the code, and you have been assigned roles for it.`
  );
}
