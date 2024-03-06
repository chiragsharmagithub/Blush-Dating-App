import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const AuthGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  var isUserAuthorized = accountService.currentUser$.pipe(
    map( user => {
      // console.log("CP1, User = " + JSON.stringify(user));
      if(Object.keys(user).length != 0) {
        // console.log("CP2, User = " + JSON.stringify(user));
        if(user.username != '' && user.token != '') {
          // console.log("CP3, User = " + JSON.stringify(user));
          return true;
        }
        else {
          // console.log("CP4, User = " + JSON.stringify(user));
          toastr.error('You must be logged in to view this page', 'Error message', {
            positionClass: 'toast-bottom-right'
          });
          return false;
        }
      }
      // console.log("CP5, User = " + JSON.stringify(user));
      toastr.error('You must be logged in to view this page', 'Error message', {
        positionClass: 'toast-bottom-right'
      });
      return false;
    })
  );

  return isUserAuthorized;
};

// export class AuthGuard implements CanActivate {
//   constructor(private accountService: AccountService, private toastr: ToastrService) {}
 
//   canActivate(): Observable<boolean> {
//     return this.accountService.currentUser$.pipe(
//       map(user => {
//         this.toastr.error('Please login/register first', 'Error message', {
//           positionClass: 'toast-bottom-right'
//         });
//         if(user) return true;
//         else {
          
//           return false;
//         }
        
//       })
//     );
//   }

// };

const CanActivateFnGuard : CanActivateFn = (route, state) => {
  return true;
}; 