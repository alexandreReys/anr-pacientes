var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, loginService, activatedRoute, router) {
        this.formBuilder = formBuilder;
        this.loginService = loginService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    }
    ;
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
            password: this.formBuilder.control('', [Validators.required, Validators.minLength(5)])
        });
        this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
    };
    ;
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(function (user) { return alert("Bem vindo, " + user.name); }, function (response) { return alert(response.error.message); }, function () {
            _this.router.navigate([atob(_this.navigateTo)]);
        });
    };
    ;
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
        // ### Email Regex
        // `/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i`
        // ### Number Regex
        // `/^[0-9]*$/`
        ,
        __metadata("design:paramtypes", [FormBuilder,
            LoginService,
            ActivatedRoute,
            Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map