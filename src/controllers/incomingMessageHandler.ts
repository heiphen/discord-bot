import { Message } from "discord.js";
import { Collection } from "mongodb";
import { handleAssignRole } from "../helper/assignRole";
import { handleCreateCode } from "../helper/createRoleCode";
import { handleGetMemberCount } from "../helper/memberCount";
import { COMMANDS } from "../utils/constants";

export async function handleIncomingChannelCommand(incomingMessage: Message, userRoleCol: Collection) {
    try {
      const messageCommand = incomingMessage.content.split(" ")[1];
  
      switch (messageCommand) {
        case COMMANDS.membercount: {
          handleGetMemberCount(incomingMessage);
          break;
        }
        case COMMANDS.createcode: {
          handleCreateCode(incomingMessage, userRoleCol);
          break;
        }
        case COMMANDS.assignRole: {
          handleAssignRole(incomingMessage, userRoleCol);
          break;
        }
        default:
          console.log(`❌  ${new Date().toISOString()}    Invalid Command    ${incomingMessage.content}`);
          break;
      }
    } catch (err) {
        console.log(`❌  ${new Date().toISOString()}    ${err}    ${incomingMessage.content}`);
    }
  };