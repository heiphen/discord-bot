import { CONSTANTS } from '../utils/constants';

export async function checkIfAdmin(message: any) {
  if (
    !message.member.roles.cache.some(
      (role: any) => role.id === CONSTANTS.ADMIN_ROLE_ID
    )
  ) {
    message.channel?.send(`This role is only for server moderators!`);
    throw new Error('Not an admin');
  }
}
