// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { fetchAPI } from "../fetchAPI";


const config = {
  method: "GET", // default
  url: "https://api.fda.gov",
  headers: {
    endpoint: "/drug", // default
    category: "/event.json",
  },
  params: {
    api_key: process.env.REACT_APP_OPENFDA_API_KEY,
    // search: What to search for, in which fields.
    // sort: Sort the results of the search by the specified field
    // count:  Count the number of unique values of a certain field
    // limit: Return up to this number of records that match the search parameter
    // skip: Skip this number of records that match the search parameter
  },
};

export function requestAPIHandler(endpoint, category, parameters) {
  if (endpoint !== null && endpoint !== "") {
    config["headers"]["endpoint"] = endpoint;
  }
  if (category !== null && category !== "") {
    console.log(category)
    config["headers"]["category"] = category;
  }
  for (var key in parameters) {
    config["params"][key] = parameters[key];
  }
  console.log(config)
  fetchAPI(config);
}
var parameters = { search: "receivedate:[20040101+TO+20081231]", limit: "50" };

requestAPIHandler(null, null, parameters);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
getAnalytics(app);
