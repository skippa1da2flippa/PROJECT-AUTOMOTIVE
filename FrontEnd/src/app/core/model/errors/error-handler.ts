import {Router} from "@angular/router";
import {HtmlErrorMessage} from "./html-error";

export class ErrorHandler {
    public router: Router
    public userMessage: HtmlErrorMessage = new HtmlErrorMessage();
    constructor(router: Router) {
        this.router = router
    }

    public async redirect(where: string) {
        await this.router.navigate([where])
    }

    protected errorHandler = async (err: any) => {
        this.userMessage.error = true;
        if (err.error === 'Unauthorized') {
            this.userMessage.errorMessage = 'session expired';
            await this.router.navigate(["/authentication/login"])
        } else this.userMessage.errorMessage = JSON.stringify(err.error.errorMessage);

        console.log('An error occurred while executing the operation: ' + JSON.stringify(err));
    }
}
