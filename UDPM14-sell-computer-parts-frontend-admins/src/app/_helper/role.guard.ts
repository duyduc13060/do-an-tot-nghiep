import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import { TokenStorageService } from '../_service/token-storage-service/token-storage.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private readonly storageService: TokenStorageService,
                private toast: NgToastService,
                private readonly router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.storageService.getUserRole() === 'ADMIN') {
            return true;
        }
        const check = this.storageService.getUserRole() === route.data['role'];
        if (!check) {
          this.toast.warning({summary:route.data['message'], duration:3000});
        }
        // if(this.storageService.getUserRole() == 'ROLE_ADMIN' && state.url === '/dashboard'){
        //     void this.router.navigate(['/selling']);
        // }
        return check;
    }

}
