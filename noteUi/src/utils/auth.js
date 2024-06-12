import { decodeToken, isExpired } from "react-jwt";
import cookies from "js-cookie"

export const isUserLoggedIn = () => {
    const token = cookies.get('Refresh_token')
    if (!token) {
        const isTokenExpired = true
        return { isTokenExpired }
    }
    const isTokenExpired = isExpired(token)
    const decodeMyToken = decodeToken(token)
    const userid = decodeMyToken?._id
    return { userid, isTokenExpired }
}

export const logout = () => {
cookies.remove("Refresh_token")
    return true;
}
