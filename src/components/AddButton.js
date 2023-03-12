import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton({onClick = () => {}}) {
  return (
    <Button
      variant="contained"
      data-cy="activity-add-button"
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
