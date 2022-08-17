import {Router} from "@angular/router";
import {HtmlErrorMessage} from "./html-error";

export class ErrorHandler {
    public router: Router
    public userMessage: HtmlErrorMessage = new HtmlErrorMessage();
    constructor(router: Router) {
        this.router = router
    }
    protected errorHandler = async (err: any) => {
        this.userMessage.error = true;
        if (err.error === 'Unauthorized') {
            this.userMessage.errorMessage = 'session expired';
            await this.router.navigate(["/logIn"])
        } else this.userMessage.errorMessage = JSON.stringify(err.error.errorMessage);

        console.log('An error occurred while executing the operation: ' + JSON.stringify(err));
    }
}
