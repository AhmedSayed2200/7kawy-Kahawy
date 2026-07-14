import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const forwardGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
    if(localStorage.getItem("social token") ){
     return true;
  }
 return router.parseUrl('/login')
};
