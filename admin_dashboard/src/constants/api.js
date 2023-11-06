
// export 
let API_URL = "https://sandbox-giupviectv.onrender.com";

if (process.env.NODE_ENV === "development") {
    API_URL = "http://localhost:6969";
}

export {
    API_URL,
}