import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import ActivityItemDeleteButtonSvg from "../assets/activity-item-delete-button.svg";
import moment from "moment";
import "moment/locale/id";

export default function TodoCard({
  title = "New Activity",
  created_at = new Date(),
  id = 0,
  onDelete = () => {},
  onDetail = () => {},
}) {
  return (
    <Box className="w-full">
      <Card
        variant="outlined"
        className="drop-shadow-md pb-2 px-4 cursor-pointer"
        sx={{borderRadius: 4, height: 234}}
        data-cy="activity-item"
        onClick={() => onDetail(id)}
      >
        <div className="flex flex-col justify-between h-full">
          <CardContent>
            <strong
              className="font-bold text-black-custom text-lg"
              data-cy="activity-item-title"
            >
              {title}
            </strong>
          </CardContent>
          <CardActions className="flex flex-row justify-between items-center">
            <span
              className="text-sm text-secondary font-semibold"
              data-cy="activity-item-date"
            >
              {moment(created_at).locale("id").format("DD MMMM YYYY")}
            </span>
            <img
              src={ActivityItemDeleteButtonSvg}
              className="w-6 h-6 cursor-pointer"
              alt={ActivityItemDeleteButtonSvg}
              onClick={() => onDelete({id, title})}
              data-cy="activity-item-delete-button"
              role="button"
            />
          </CardActions>
        </div>
      </Card>
    </Box>
  );
}
