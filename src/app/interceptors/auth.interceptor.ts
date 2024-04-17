import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('authInterceptor');

  const userService = inject(UserService);

  let loggedUserData;
  const localData = localStorage.getItem('TokenData');
  if (localData != null) {
    loggedUserData = JSON.parse(localData);
  }

  // console.log('LocalTokenData:', localData);

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${loggedUserData.token}`
    }
  });

  // console.log('CLONE:' , cloneRequest);
  // console.log('AUTH-CLONE');

  return next(cloneRequest).pipe(
    catchError((error) => {
      if (error.status === 401) {
        const isRefresh  = confirm('Your Session is Expared. Do you to Continue');
        if (isRefresh) {
          userService.$refreshToken.next(true);
        }
      } 
      return throwError(error);
    })
  );
};
