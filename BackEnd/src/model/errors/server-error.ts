
const msgs404: string[] = ["No user with that identifier", 'Notification not found', "No car with that identifier"]
const msgs400: string[] = ['Role already set'] 
const msgs500: string[] = ["Internal server error", 'Error with password encryption', 'Error with salt generation']


export class ServerError extends Error {
    statusCode: number;
  
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ServerError.prototype);

        if (msgs404.includes(message)) this.statusCode = 404

        else if (msgs500.includes(message)) this.statusCode = 500

        else if (msgs400.includes(message)) this.statusCode = 400 
    }
  
    getErrorMessage() {
      return 'Something went wrong: ' + this.message;
    }
}