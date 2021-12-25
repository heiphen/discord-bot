import { Message } from 'discord.js';
import { handleCreateCode } from '../helper/createRoleCode';
import { handleGetCount } from '../helper/getCount';
import { handleGetCountAll } from '../helper/getCountAll';
import { handleGetMemberCount } from '../helper/memberCount';
import { checkIfAdmin } from '../middlewares/roleAuth';
import { COMMANDS } from '../utils/constants';

export async function handleIncomingChannelCommand(message: Message) {
  switch (message.content.split(/\s+/)[1]) {
    case COMMANDS.membercount: {
      handleGetMemberCount(message);
      break;
    }
    case COMMANDS.createcode: {
      checkIfAdmin(message);
      handleCreateCode(message);
      break;
    }
    case COMMANDS.getCount: {
      checkIfAdmin(message);
      handleGetCount(message);
      break;
    }
    case COMMANDS.getCountAll: {
      checkIfAdmin(message);
      handleGetCountAll(message);
      break;
    }
    default:
      console.log(`Invalid Command    ${message.content}`);
      break;
  }
}
