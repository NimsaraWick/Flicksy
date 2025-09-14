import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";


export const fetchfromTMDB = async (url) => {
    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + ENV_VARS.API_KEY
        }
    };

    //in fetch
    // const res = await fetch ("");
    // const data = await res.json();
    // return data;

    const response = await axios.get(url, options);

    //error handling 
    if(response.status !== 200){
        throw new Error("Failed to fetch from TMDB" + response.statusText);
    }
    return  response.data;

} 