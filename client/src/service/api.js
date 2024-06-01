import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config'
// const backendPort = 8000;
import { getAccessToken, getType } from "../utils/common-utils";

const API_URl = `http://localhost:8000`   //backend url

const axiosInstance = axios.create({
  baseUrl: API_URl,
  timeout: 100000,
  headers: {
    "content-type": "application/json",
  }
})

//interceptors, 2 case me banta hai, pehla request ke case me aur dusra respnse ke case me.


//Request interceptors
//ye 2 callback function leta hai ek successfull ke case me aur dusra failure ke case me .
axiosInstance.interceptors.request.use(
  function (config) {
    // return config
    // debugger;
    if (config.TYPE.params) {
      config.params = config.TYPE.params
    } else if (config.TYPE.query) {
      config.url = config.url + '/' + config.TYPE.query
    };
    return config;
  },
  function (error) {
    Promise.reject(error);
  }
)


//Response interceptors
axiosInstance.interceptors.response.use(
  async function (response) {
    //stop global loader here.
    // debugger;
    let resp = processResponse(response)  //jb response aayega tb ye function call hoga
    return resp
  },

  function (error) {
    //stop global loader here
    // return Promise.reject(processError(error))   // jb error aayega tb ye function call hoga
    let resp = processError(error)
    return resp
  }
)



// If response is success ====> return {isSuccess: true, data: object}.
// If error or fail =====> return {isFailure: true, status: string, msg:string, code: int}
const processResponse = (response) => {
  // debugger;
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data }
  }
  else {
    return { isFailure: true, status: response?.status, msg: response?.msg, code: response?.code }
  }
}





// If response is success ====> return {isSuccess: true, data: object}.
// If error or fail =====> return {isFailure: true, status: string, msg:string, code: int}
const processError = async (error) => {
  if (error.response) {
    //Request made and server responded with a status other
    // that falls out of the range 2.x.x - mtlb server ke pass request gyi hai aur response 500 aaya hai ya 400 aaya hai 200 nhi aaya hai.
    console.log(`Error in RESPONSE`, error.toJSON())
    // return { isError: true, msg: API_NOTIFICATION_MESSAGES.responseFailure, code: error.response.status }
    return { isError: true, msg: error.response.data.msg ? error.response.data.msg : API_NOTIFICATION_MESSAGES.responseFailure, code: error.response.status }
  } else if (error.request) {
    //request made but no response was recieved, mtlb maine request bheji hai lekin response nhi aaya hai.
    console.log(`Error in REQUEST`, error.toJSON())
    return { isError: true, msg: API_NOTIFICATION_MESSAGES.requestFailure, code: "" }

  } else {
    //Something happened in setting up request that triggers an errors.
    console.log(`Error in NETWORK`, error.toJSON())
    return { isError: true, msg: API_NOTIFICATION_MESSAGES.networkError, code: "" }
  }
}


const API = {};

// for (const [key, value] of Object.entries(SERVICE_URLS)) {
//   debugger
//   API[key] = (body, showUploadProgress, showDownloadProgress) =>
//     axiosInstance({
//       method: value.method,
//       url: value.url,
//       data: body,
//       responseType: value.responseType,
//       onUploadProgress: function (progressEvent) {
//         if (showUploadProgress) {
//           let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           showUploadProgress(percentageCompleted)
//         }
//       },

//       onDownloadProgress: function (progressEvent) {
//         if (showDownloadProgress) {
//           let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           showDownloadProgress(percentageCompleted)
//         }
//       }
//     });
// }



for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = async (body, showUploadProgress, showDownloadProgress) => {
    console.log("BBBBBB", SERVICE_URLS[key])
    return await axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === 'DELETE' ? {} : body,
      // headers: SERVICE_URLS[key].headers ? SERVICE_URLS[key].headers : { "content-type": "application/json" },
      headers: {
        authorization: getAccessToken(),
        "content-type": SERVICE_URLS[key].headers ? SERVICE_URLS[key].headers : "application/json"
      },
      responseType: value.responseType,
      TYPE: getType(value, body),
      onUploadProgress: await function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          showUploadProgress(percentageCompleted)
        }
      },
      onDownloadProgress: await function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          showDownloadProgress(percentageCompleted)
        }
      }
    }).catch(error => {
      console.error('Error:', error);
      throw error; // Rethrow the error to be caught elsewhere if needed
    });
  }
}

export default API;