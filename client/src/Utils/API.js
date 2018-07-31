import axios from "axios";

export default {
  // Gets all Blogs
  getBlogs: function() {
    return axios.get("/api/blogs");
  },
  // Gets the Article with the given id
  getArticle: function(id) {
    return axios.get("/api/blogs/" + id);
  },
  // Deletes the Article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/blogs/" + id);
  },
  // Saves a Article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/blogs", articleData);
  }
};