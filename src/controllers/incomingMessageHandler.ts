import { Message } from 'discord.js';
import { handleCreateCode } from '../helper/createRoleCode';
import { handleGetCount } from '../helper/getCount';
import { handleGetCountAll } from '../helper/getCountAll';
import { handleGetMemberCount } from '../helper/memberCount';
import { COMMANDS } from '../utils/constants';

export async function handleIncomingChannelCommand(incomingMessage: Message) {
  const messageCommand = incomingMessage.content.split(/\s+/)[1];
  switch (messageCommand) {
    case COMMANDS.membercount: {
      handleGetMemberCount(incomingMessage);
      break;
    }
    case COMMANDS.createcode: {
      handleCreateCode(incomingMessage);
      break;
    }
    case COMMANDS.getCount: {
      handleGetCount(incomingMessage);
      break;
    }
    case COMMANDS.getCountAll: {
      handleGetCountAll(incomingMessage);
      break;
    }
    default:
      console.log(`Invalid Command    ${incomingMessage.content}`);
      break;
  }
}
