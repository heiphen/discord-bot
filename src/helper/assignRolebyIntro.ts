import { CONSTANTS } from '../utils/constants';

export async function assignRoleOnIntroduction(message: any) {
  const role = message.guild?.roles.cache.find(
    (role: any) => role.id == CONSTANTS.COMMUNITY_ROLE_ID
  );
  if (
    message.member.roles.cache.some(
      (role: any) => role.id === CONSTANTS.COMMUNITY_ROLE_ID
    )
  )
    return;
  if (!role) return;

  const unassignedRole = message.guild?.roles.cache.find(
    (role: any) => role.id == CONSTANTS.UNASSIGNED_ROLE_ID
  );
  if (unassignedRole)
    message.guild?.members?.cache
      ?.get(message?.author?.id)
      ?.roles?.remove(unassignedRole);

  message.guild?.members?.cache?.get(message?.author?.id)?.roles?.add(role);
  message.member?.send(
    `Hi, <@${message.author.id}> nice to e-meet you, Now you have the access to the Heiphen community!`
  );
}
