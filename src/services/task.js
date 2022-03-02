import axiosClient from "./axiosClient";

class TaskService {
  fetchTaskTypes() {
    return axiosClient.get("/api/TaskType/getAll");
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
  updateTaskStatus(data) {
    return axiosClient.put("/api/Project/updateStatus", data);
  }
}

export default TaskService;
