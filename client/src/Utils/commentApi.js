import axios from "axios";

export default {
  // Gets all Blogs
  getBlogs: function() {
    return axios.get("/api/blogs");
  },
  // Gets the Blog with the given id
  getBlog: function(id) {
    return axios.get("/api/blogs/" + id);
  },
  // Deletes the Blog with the given id
  deleteBlog: function(id) {
    return axios.delete("/api/blogs/" + id);
  },
  // Saves a Blog to the database
  saveBlog: function(blogData) {
    return axios.post("/api/blogs", blogData);
  }
};