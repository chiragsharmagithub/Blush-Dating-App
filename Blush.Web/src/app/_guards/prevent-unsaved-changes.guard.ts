import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, CanDeactivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  
  canDeactivate(component: MemberEditComponent): boolean {
    if(component.editFormViewChild.dirty)  {
      return confirm('Are you sure you want to leave? Any unsaved changes will be lost.');
    }
    return true;
  }

}