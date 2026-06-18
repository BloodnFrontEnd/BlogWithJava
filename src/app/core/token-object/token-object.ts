import {ITokenDTO} from '../../features/auth/auth-service';

export function setToken(obj: ITokenDTO): void{
  sessionStorage.setItem('accessToken', obj.accessToken);
  sessionStorage.setItem('refreshToken', obj.refreshToken);
  sessionStorage.setItem('username', obj.username);
  sessionStorage.setItem('displayName', obj.displayName);
  sessionStorage.setItem('role', obj.role);
}
