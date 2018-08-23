import axios from "axios";

export default {
  // Gets all Blogs
  // getBlogs: function() {
  //   return axios.get("/api/blogs");
  // },
  // Gets all Blogs by query
  // getBlogsByQuery: function(query) {
  //   return axios.get("/api/blogs/" + query);
  // },

  getBlogs: function(queryParam) {
    return axios.get("/api/blogs/", {
      query: queryParam
    });
  },
  // Gets the Blog with the given id
  getBlogById: function(id) {
    return axios.get("/api/blogs/" + id);
  },
  // Deletes the Blog with the given id
  deleteBlog: function(id) {
    return axios.delete("/api/blogs/" + id);
  },
  // update the Blog with the given id and
  updateBlog: function(id, blogData) {
    return axios.put("/api/blogs/" + id, blogData);
    //return axios.post("/api/blogs/comment/" + id, blogData);
  },
  // Saves a Blog to the database
  saveBlog: function(blogData) {
    return axios.post("/api/blogs", blogData);
  }
};
