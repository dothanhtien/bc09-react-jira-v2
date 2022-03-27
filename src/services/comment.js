import axiosClient from "./axiosClient";

class CommentService {
  getAllComments(taskId) {
    return axiosClient.get("/api/Comment/getAll", { params: { taskId } });
  }

  //   {
  //     "taskId": 0,
  //     "contentComment": "string"
  //   }
  insertComment(data) {
    return axiosClient.post("/api/Comment/insertComment", data);
  }

  updateComment(id, content) {
    return axiosClient.put(
      "/api/Comment/updateComment",
      {},
      { params: { id, contentComment: content } }
    );
  }

  deleteComment(commentId) {
    return axiosClient.delete("/api/Comment/deleteComment", {
      params: { idComment: commentId },
    });
  }
}

export default CommentService;
