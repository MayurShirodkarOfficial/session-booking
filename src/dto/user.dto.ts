export class UserResponse {
    firstname: string | undefined;
    lastname:string | undefined;
    email: string | undefined;
    role: string | undefined;

    constructor (firstname:string,lastname:string,email:string,role:string){
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.role = role;
    }
  }