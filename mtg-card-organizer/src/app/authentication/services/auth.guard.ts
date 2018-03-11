import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router) {}

    canActivate(): boolean {
        if (this.authenticationService.hasValidToken) {
            return true;
        } else {
            this.router.navigateByUrl('/auth/login');
            return false;
        }
    }
}
