import Cookies from "js-cookie";
import axios from "axios";

//   baseURL: "https://752f-118-70-132-104.ngrok-free.app",
//   headers: { 
//     "ngrok-skip-browser-warning": "1",
//     Authorization: `Bearer ${jwt}`
// },

// const base_url = "https://edustar-app-demo-5bad83017071.herokuapp.com"
// const base_url = "http://localhost:8088"
const base_url = "https://service.edustar.com.vn"

const login_path = "/auth/login"


//Truoc khi call API
axios.interceptors.request.use((req) => {
    //Noi 2 url voi nhau
    const jwt = Cookies.get("jwt")
    const newUrl = base_url + req.url
    const Authorization =( login_path === req.url || req.url.startsWith("client")) ? undefined : `Bearer ${jwt}`
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
