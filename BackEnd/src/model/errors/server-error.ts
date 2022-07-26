
const msgs404: string[] = [ 
    "No user with that identifier", 
    'Notification not found', 
    "No vehicle with that identifier", 
    "No vehicles related to the user",
    "No enjoyed vehicles related to this user",
    "No user routine found matching the id",
    "No user/notification with that identifier"
]

const msgs400: string[] = [
    'Role already set',
    "There shouldn't be more than one client vehicle listening to a specific vehicle room",
    "Users already inside the enjoyers",
    "User already owner of the car",
    "Routine name already with that value"
]

const msgs500: string[] = [
    "Internal server error", 
    'Error with password encryption', 
    'Error with salt generation'
]


export class ServerError extends Error {
    readonly statusCode: number;
  
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