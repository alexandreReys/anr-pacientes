import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    ErrorHandler.handleError = function (error) {
        var errorMessage;
        if (error instanceof HttpErrorResponse) {
            if (error.status == 200)
                errorMessage = 'OK';
            else
                errorMessage = "Error " + error.status + " ao obter a URL " + error.url + " - " + error.statusText;
        }
        else {
            errorMessage = error.toString();
        }
        if (errorMessage == 'OK')
            errorMessage = 'Operação realizada com sucesso !!';
        else
            console.log('Erro : ' + errorMessage);
        return throwError(errorMessage);
    };
    return ErrorHandler;
}());
export { ErrorHandler };
//# sourceMappingURL=app.error-handler.js.map