import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.handleError = function (error) {
        var errorMessage;
        if (error instanceof HttpErrorResponse) {
            errorMessage = "Error " + error.status + " ao obter a URL " + error.url + " - " + error.statusText;
        }
        else {
            errorMessage = error.toString();
        }
        console.log('Erro : ' + errorMessage);
        return throwError(errorMessage);
    };
    return ErrorHandler;
}());
export { ErrorHandler };
//# sourceMappingURL=app.error-handler.js.map