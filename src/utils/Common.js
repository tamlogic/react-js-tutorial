import AppConfig from "config/AppConfig";

// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem(AppConfig.STORAGE_KEYS.user);
  if (userStr) return JSON.parse(userStr);
  else return null;
}
 
// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem(AppConfig.STORAGE_KEYS.token) || null;
}
 
// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem(AppConfig.STORAGE_KEYS.token);
  sessionStorage.removeItem(AppConfig.STORAGE_KEYS.user);
}
 
// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem(AppConfig.STORAGE_KEYS.token, token);
  sessionStorage.setItem(AppConfig.STORAGE_KEYS.user, JSON.stringify(user));
}