import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton({
  onClick = () => {},
  dataCy = "activity-add-button",
}) {
  return (
    <Button
      variant="contained"
      data-cy={dataCy}
      className="rounded bg-primary add-button"
      onClick={onClick}
      style={{textTransform: "none"}}
    >
      <div className="flex flex-row py-2 px-4">
        <AddIcon />
        <span className="font-semibold ml-1 text-lg font-poppins">Tambah</span>
      </div>
    </Button>
  );
}
