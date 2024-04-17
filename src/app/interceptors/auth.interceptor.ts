import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('authInterceptor');
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

  return next(cloneRequest);
};
