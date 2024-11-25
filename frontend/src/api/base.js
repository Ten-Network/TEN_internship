// // // import axios from "axios";

// // // const api = axios.create({
// // //   // baseURL: "https://interns-f4di.onrender.com/",
// // //   baseURL: "https://interns-f4di.onrender.com/",
// // // });

// // // // Set the default headers for all requests
// // // api.defaults.headers.common["Content-Type"] = "application/json";
// // // // api.defaults.headers.common["Access-Control-Allow-Origin"] =
// // // //   "https://internconnect-fdoz.onrender.com/";

// // // export default api;












// // // import axios from "axios";

// // // // Create an axios instance with default configuration
// // // const api = axios.create({
// // //   baseURL: "https://interns-f4di.onrender.com", // Base URL of your backend API
// // //   headers: {
// // //     "Content-Type": "application/json",
// // //   },
// // // });

// // // // Optional: Add a request interceptor to attach the auth token if it exists
// // // api.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem("auth-token"); // Adjust if using sessionStorage
// // //     if (token) {
// // //       config.headers["Authorization"] = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => {
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // // Optional: Add a response interceptor to handle errors globally
// // // api.interceptors.response.use(
// // //   (response) => {
// // //     return response;
// // //   },
// // //   (error) => {
// // //     // Handle specific error responses here, e.g., redirect to login on 401
// // //     if (error.response && error.response.status === 401) {
// // //       // Redirect to login or handle token expiration
// // //       localStorage.removeItem("auth-token");
// // //       window.location.href = "/login";
// // //     }
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // export default api;







// // import axios from "axios";

// // const api = axios.create({
// //   baseURL: "https://interns-f4di.onrender.com", // Change this to your backend's base URL
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // // Add a request interceptor to attach the token if it exists
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = sessionStorage.getItem("auth-token"); // Adjust if using localStorage or another method
// //     if (token) {
// //       config.headers["authtoken"] = token; // Attach the token to the request
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // export default api;













// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://interns-f4di.onrender.com", // Make sure this is your backend's base URL
//   headers: {
//     "Content-Type": "multipart/form-data",
//     "Content-Type": "application/json",
  
//   },
// });

// // Add a request interceptor to attach the token if it exists
// api.interceptors.request.use(
//   (config) => {
//     const token = sessionStorage.getItem("auth-token"); // Adjust if using localStorage or another method
//     if (token) {
//       config.headers["authtoken"] = token; // Attach the token to the request
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "https://interns-f4di.onrender.com", 
  // baseURL: "http://localhost:5000", 
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken"); // Get token from sessionStorage or wherever you store it
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
