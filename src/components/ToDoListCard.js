import {Checkbox} from "@mui/material";

import ActivityItemDeleteButtonSvg from "../assets/activity-item-delete-button.svg";
import ToDoTitleEditButtonSvg from "../assets/todo-title-edit-button.svg";

export default function ToDoListCard({
  data = {},
  onCheck = () => {},
  onDelete = () => {},
  onEdit = () => {},
}) {
  return (
    <div className="drop-shadow-lg rounded-md w-full flex flex-row justify-between items-center p-4 bg-white">
      <div className="flex flex-row items-center">
        <Checkbox checked={!data?.is_active} onChange={() => onCheck(data)} />
        <div className="flex flex-row items-center ml-1">
          <div
            className={`dot bg-${
              data?.priority === "normal" ? "medium" : data?.priority
            } mr-4`}
          >
            {"  "}
          </div>
          <span
            className={`text-lg font-medium ${
              !data?.is_active ? "text-secondary line-through" : ""
            }`}
          >
            {data?.title}
          </span>
          <img
            src={ToDoTitleEditButtonSvg}
            alt={ToDoTitleEditButtonSvg}
            className="w-6 h-6 cursor-pointer ml-4"
            data-cy="todo-title-edit-button"
            role="button"
            onClick={() => onEdit(data)}
          />
        </div>
      </div>
      <img
        src={ActivityItemDeleteButtonSvg}
        className="w-6 h-6 cursor-pointer"
        alt={ActivityItemDeleteButtonSvg}
        onClick={() => onDelete(data)}
        data-cy="activity-item-delete-button"
        role="button"
      />
    </div>
  );
}
