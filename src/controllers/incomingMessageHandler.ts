import { Message } from "discord.js";
import { Collection } from "mongodb";
import { handleCreateCode } from "../helper/createRoleCode";
import { handleGetCount } from "../helper/getCount";
import { handleGetCountAll } from "../helper/getCoutAll";
import { handleGetMemberCount } from "../helper/memberCount";
import { COMMANDS } from "../utils/constants";

export async function handleIncomingChannelCommand(incomingMessage: Message, userRoleCol: Collection) {
    try {
      const messageCommand = incomingMessage.content.split(/\s+/)[1];
  
      switch (messageCommand) {
        case COMMANDS.membercount: {
          handleGetMemberCount(incomingMessage);
          break;
        }
        case COMMANDS.createcode: {
          handleCreateCode(incomingMessage, userRoleCol);
          break;
        }
        case COMMANDS.getCount: {
          handleGetCount(incomingMessage, userRoleCol);
          break;
        }
        case COMMANDS.getCountAll: {
          handleGetCountAll(incomingMessage, userRoleCol);
          break;
        }
        default:
          console.log(`Invalid Command    ${incomingMessage.content}`);
          break;
      }
    } catch (err) {
        console.log(`${err}    ${incomingMessage.content}`);
    }
  };