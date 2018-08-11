import axios from "axios";

const BASEURL = "https://api.betterdoctor.com/2016-03-01/doctors/npi/";
const APIKEY = "846da4bd59f3ce9ca0cf178f3930f2bb";

// https://api.betterdoctor.com/2016-03-01/doctors/npi/1720008204?user_key=846da4bd59f3ce9ca0cf178f3930f2bb
// Export an object 
export default {
  verifyBlogger: function(query) {
    console.log('search parameters: \n', query);
    return axios.get(`${BASEURL}${query}?user_key=${APIKEY}`);
  }
};