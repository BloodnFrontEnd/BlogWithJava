import { HttpInterceptorFn} from '@angular/common/http'

export const authInterceptor: HttpInterceptorFn = (req: any, next: any) => {
  const token = sessionStorage.getItem('accessToken');

  if(!token){
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
    }
  })

  return next(authReq);
}
