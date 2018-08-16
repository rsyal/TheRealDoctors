import axios from "axios";

export default {
  // Gets all Bloggers
  getBloggers: function(query) {
    return axios.get("/api/bloggers/" + query);
  },
  // Gets the Blogger with the given id
  getBlogger: function(id) {
    return axios.get("/api/bloggers/" + id);
  },
  // Deletes the Blogger with the given id
  deleteBlogger: function(id) {
    return axios.delete("/api/bloggers/" + id);
  },
  // Saves a Blogger to the database
  saveBlogger: function(bloggerData) {
    return axios.post("/api/bloggers", bloggerData);
  }
};
