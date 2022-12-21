import { ConsoleLogger, Logger } from '@nestjs/common';


export class MyLogger extends ConsoleLogger {

  setContext(context: string) {
    this.context = context;
  }

  log(message: any) {
    console.log(message)
    super.log(message);
  }
  error(message: string, trace: string) {
    /* your implementation */
    console.log(message)
    super.error(message, trace);
  }
  warn(message: any) {
    /* your implementation */
    console.log(message)
    super.warn(message);
  }
  debug(message: string) {
    /* your implementation */
    console.log(message)
    super.debug(message);
  }
  verbose(message: string) {
    /* your implementation */
    console.log(message)
    super.verbose(message);
  }


}