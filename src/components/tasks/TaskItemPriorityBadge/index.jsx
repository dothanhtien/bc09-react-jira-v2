import React from "react";

const TaskItemPriorityBadge = ({ priorityTask }) => {
  const { priority } = priorityTask;

  const renderClassesAccordingToPrority = () => {
    const classes = "text-xs rounded px-1 border border-solid";

    if (priority === "High") {
      return classes + " text-red-700 border-red-700";
    }

    if (priority === "Medium") {
      return classes + " text-orange-700 border-orange-700";
    }

    if (priority === "Low") {
      return classes + " text-yellow-700 border-yellow-700";
    }

    if (priority === "Lowest") {
      return classes + " text-gray-700 border-gray-700";
    }

    return classes;
  };

  return <span className={renderClassesAccordingToPrority()}>{priority}</span>;
};

export default TaskItemPriorityBadge;
