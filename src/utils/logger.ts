export function serverLogger(type: string, message: any, error: any) {
    if (type == "success") {
      console.log(
        `✔️   ${new Date().toISOString()}        ${type}        ${message}`
      );
    } else {
      console.log(
        `❌  ${new Date().toISOString()}        ${type}        ${message}        `,
        error
      );
    }
  }