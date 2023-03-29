import {Modal, Box} from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "12px",
  bgcolor: "background.paper",
  boxShadow: 24,
  "&:focus": {
    outline: "none",
  },
};

export default function ModalAlert({open = false, handleClose = () => {}}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="w-96">
        <div className="flex flex-row p-4 items-center">
          <ErrorOutlineOutlinedIcon
            className="text-success"
            data-cy="modal-information-icon"
          />
          <p
            className="text-sm ml-2 font-medium"
            data-cy="modal-information-title"
          >
            Activity berhasil dihapus
          </p>
        </div>
      </Box>
    </Modal>
  );
}
