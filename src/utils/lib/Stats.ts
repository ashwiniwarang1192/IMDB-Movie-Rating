import * as config from 'config';
import { StatsServiceImpl } from 'pretrCommonLibraries';

class Stats {
  private static instance: StatsServiceImpl;

  public static getInstance() {
    if (!Stats.instance) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      Stats.instance = StatsServiceImpl.getInstance(config.get('statsD.host'));
    }
    return Stats.instance;
  }
}

export default Stats.getInstance();

// /**
//  * This is common class to handle all statsD related operations
//  */
// import * as httpContext from 'express-http-context';
// import * as config from 'config';

// const StatsD = require('node-statsd');

// export default class Stats {
//   static statsDClient = new StatsD(config.get('statsD.host'));

//   static identifierName: string;

//   /**
//    * This will create increment and timer events for current identifier
//    */
//   static async createStats(): Promise<boolean> {
//     /* This function is commented as replaced by createStatsWithStatus
//     Stats.identifierName = httpContext.get('identifier');
//     try {
//       await Stats.logExecutionTime();
//       await Stats.incrementApiCounter();
//       return true;
//     } catch (error) {
//       return false;
//     }*/
//     return true;
//   }

//   /**
//    * This function will create stats containing url details with success/error
//    * Depricating createStats()
//    */
//   static async createStatsWithStatus(response: string): Promise<boolean> {
//     Stats.identifierName = `${httpContext.get('statsPath')}.${response}HI`;
//     try {
//       await Stats.logExecutionTime();
//       await Stats.incrementApiCounter();
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }
//   /**
//   * Will log time difference[Executoin time of process] in statsD
//   */
//   static async incrementApiCounter() {
//     await Stats.statsDClient.increment(Stats.identifierName);
//   }

//   /**
//    * Will log time difference[Executoin time of process] in statsD
//    */
//   static async logExecutionTime() {
//     await Stats.statsDClient.timing(Stats.identifierName, Stats.getExecutionTime());
//   }

//   /**
//    * Will return time difference in ms, from starting of the process.
//    */
//   static getExecutionTime(): number {
//     const endTime = process.hrtime(httpContext.get('reqStartTime'));
//     const totalTime = endTime[0] * 1000 + endTime[1] * 0.000001;
//     return totalTime;
//   }
// }
