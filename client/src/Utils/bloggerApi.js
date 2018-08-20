import axios from "axios";

export default {
  // Gets all Bloggers for a given email
  // getBloggers: function(currentUserEmail) {
  //   return axios.get("/api/bloggers/", {
  //     query: {
  //       email: currentUserEmail
  //     }
  //   });
  // },
  // Gets the Blogger with the given id
  // getBlogger: function(id) {
  //   return axios.get("/api/bloggers/" + id);
  // },

  // Gets the Blogger with the given id
  getBlogger: function(queryParam) {
    return axios.get("/api/bloggers/", {
      query: queryParam
    });
  },
  // update the Blogger with the given user._id 
  updateBlogger: function(id, userData) {
    return axios.put("/api/bloggers/" + id, userData);
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
