import { Speaker } from "../models/speaker.entity";

export class SessionResponse {
    speakerName: string | undefined;
    startTime:Date | undefined;
    endTime: Date | undefined;
    constructor (speakerName:string,startTime:Date,endTime:Date){
      this.speakerName = speakerName;
      this.startTime = startTime;
      this.endTime = endTime;
    }
  }