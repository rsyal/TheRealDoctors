import axios from "axios";

export default {
  // Gets all Bloggers
  getAuth: function(query) {
    return axios.get("/api/v1/auth/google");
  }, 
  // Saves a Blogger to the database
  postAuth: function(option) {
    return axios.post("/api/v1/auth/google", option);
  }
}

