export class SpeakerResponse {
    firstname: string | undefined;
    lastname:string | undefined;
    email: string | undefined;
    expertise: string | undefined;
    pricePerSession:number | undefined;
    role: string | undefined;

    constructor (firstname:string,lastname:string,email:string,expertise:string,pricePerSession:number,role:string){
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.expertise = expertise;
      this.pricePerSession = pricePerSession; 
      this.role = role;
    }
  }