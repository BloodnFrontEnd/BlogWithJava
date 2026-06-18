export function setToken(obj: any): void{
  sessionStorage.setItem('accessToken', obj.accessToken);
  sessionStorage.setItem('refreshToken', obj.refreshToken);
  sessionStorage.setItem('username', obj.username);
  sessionStorage.setItem('displayName', obj.displayName);
  sessionStorage.setItem('role', obj.role);
}
