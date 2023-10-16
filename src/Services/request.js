import Cookies from "js-cookie";
import axios from "axios";

//   baseURL: "https://752f-118-70-132-104.ngrok-free.app",
//   headers: { 
//     "ngrok-skip-browser-warning": "1",
//     Authorization: `Bearer ${jwt}`
// },

const base_url = "https://a4ff-118-70-132-104.ngrok-free.app"

const login_path = "/auth/login"


//Truoc khi call API
axios.interceptors.request.use((req) => {
    //Noi 2 url voi nhau
    const jwt = Cookies.get("jwt")
    const newUrl = base_url + req.url
    const Authorization = login_path === req.url ? undefined : `Bearer ${jwt}`
    return{
        ...req,
        url: newUrl,
        headers: {
            ...req.headers,
            Authorization,
            'ngrok-skip-browser-warning': '1'
        }
    }
})

//Sau khi co response tra ve
axios.interceptors.response.use((response) => {
    return response
}, (err) => {
    return Promise.reject(err)
})

export default axios
