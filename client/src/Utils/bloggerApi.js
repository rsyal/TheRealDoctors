import axios from "axios";

export default {
  // Gets all Bloggers
  getBloggers: function() {
    return axios.get("/api/Bloggers");
  },
  // Gets the Blogger with the given id
  getBlogger: function(id) {
    return axios.get("/api/Bloggers/" + id);
  },
  // Deletes the Blogger with the given id
  deleteBlogger: function(id) {
    return axios.delete("/api/Bloggers/" + id);
  },
  // Saves a Blogger to the database
  saveBlogger: function(bloggerData) {
    return axios.post("/api/Bloggers", bloggerData);
  }
};