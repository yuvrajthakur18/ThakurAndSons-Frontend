// export const API_BASE_URL = "https://thakur-and-sons-backend-production.up.railway.app/";

// const jwt = localStorage.getItem("jwt");

// export const apiFetch = async (endpoint, options = {}) => {
//     // Set up default headers, including Authorization and Content-Type
//     const headers = {
//         "Authorization": `Bearer ${jwt}`,
//         "Content-Type": "application/json",
//         ...options.headers,  // Allow additional headers to be passed
//     };

//     // Merge the options with the defaults
//     const config = {
//         ...options,
//         headers,
//     };

//     // Perform the fetch request with the full URL and config
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

//     // Check if the response is successful
//     if (!response.ok) {
//         // Handle errors as needed
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Something went wrong!");
//     }

//     // Parse the response JSON
//     return await response.json();
// };



// import axios from "axios"

// export const API_BASE_URL = "https://thakur-and-sons-backend-production.up.railway.app/"

// const jwt = localStorage.getItem("jwt")

// export const api = axios.create({
//     baseUrl: API_BASE_URL,
//     headers:{
//         "Authorization" : `Bearer ${jwt}`,
//         'Content-Type': "application/json"
//     }
// })