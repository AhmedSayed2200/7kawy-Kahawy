import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const backwardGuard: CanActivateFn = (route, state) => {

  const router=inject(Router)
    if(localStorage.getItem("social token") ){
     return router.parseUrl('/time-line');
  }
 return true
};
