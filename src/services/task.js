import axiosClient from "./axiosClient";

class TaskService {
  fetchTaskTypes() {
    return axiosClient.get("/api/TaskType/getAll");
  }

  fetchTaskDetails(taskId) {
    return axiosClient.get("/api/Project/getTaskDetail", {
      params: { taskId },
    });
  }

  // {
  //     "listUserAsign": [
  //         0
  //     ],
  //     "taskName": "string",
  //     "description": "string",
  //     "statusId": "string",
  //     "originalEstimate": 0,
  //     "timeTrackingSpent": 0,
  //     "timeTrackingRemaining": 0,
  //     "projectId": 0,
  //     "typeId": 0,
  //     "priorityId": 0
  // }
  createTask(data) {
    return axiosClient.post("/api/Project/createTask", data);
  }

  // {
  //   "taskId": 0,
  //   "statusId": "string"
  // }
  updateStatus(data) {
    return axiosClient.put("/api/Project/updateStatus", data);
  }

  // {
  //   "taskId": 0,
  //   "priorityId": 0
  // }
  updatePriority(data) {
    return axiosClient.put("/api/Project/updatePriority", data);
  }

  // {
  //   "taskId": 0,
  //   "description": "string"
  // }
  updateDescription(data) {
    return axiosClient.put("/api/Project/updateDescription", data);
  }

  // {
  //   "listUserAsign": [
  //     0
  //   ],
  //   "taskId": "string",
  //   "taskName": "string",
  //   "description": "string",
  //   "statusId": "string",
  //   "originalEstimate": 0,
  //   "timeTrackingSpent": 0,
  //   "timeTrackingRemaining": 0,
  //   "projectId": 0,
  //   "typeId": 0,
  //   "priorityId": 0
  // }
  updateTask(data) {
    return axiosClient.post("/api/Project/updateTask", data);
  }

  deleteTask(taskId) {
    return axiosClient.delete("/api/Project/removeTask", {
      params: { taskId },
    });
  }
}

export default TaskService;
