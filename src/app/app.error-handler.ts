import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";

export class ErrorHandler {
    static handleError(error: HttpErrorResponse | any) {
        let errorMessage: string;

        if(error instanceof HttpErrorResponse){
            if (error.status == 200)
                errorMessage = 'OK'
            else
                errorMessage = `Error ${error.status} ao obter a URL ${error.url} - ${error.statusText}`
        }
        else {
            errorMessage = error.toString();
        }

        if (errorMessage == 'OK')
            errorMessage = 'Operação realizada com sucesso !!'
        else
            console.log('Erro : ' + errorMessage);

        return throwError(errorMessage);
    }
}