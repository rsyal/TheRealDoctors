import axios from "axios";

export default {
  // Gets all Comments
  getComments: function() {
    return axios.get("/api/comments");
  },
  // Gets the Comment with the given id
  getComment: function(id) {
    return axios.get("/api/comments/" + id);
  },
  // Deletes the Blog with the given id
  deleteComment: function(id) {
    return axios.delete("/api/comments/" + id);
  },
  // Saves a Blog to the database
  saveComment: function(commentData) {
    return axios.post("/api/comments", commentData);
  }
};
