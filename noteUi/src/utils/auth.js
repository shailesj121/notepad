import { decodeToken, isExpired} from "react-jwt";
import cookies from "js-cookie"

export const isUserLoggedIn = ()=> {
    const token = cookies.get('Refresh_token') 
    if(token) {
    const isTokenExpired = isExpired(token)
    const decodeMyToken = decodeToken(token)
    const userid = decodeMyToken?.username
    const useremail = decodeMyToken?.email
    return {userid, useremail, isTokenExpired}
    }
    const isTokenExpired = true
    return {isTokenExpired}
}

export const logout = ()=> {
   cookies.remove("Refresh_token")
        return true
}

export const login = ()=> {
    cookies.remove("Refresh_token")
         return true
 }