import {Modal, Box} from "@mui/material";
import ModalDeleteIconSvg from "../assets/modal-delete-icon.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 490,
  height: 355,
  borderRadius: "12px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "&:focus": {
    outline: "none",
  },
};

export default function ModalDelete({
  open = false,
  handleClose = () => {},
  title = "Meeting dengan Client",
  onDelete = () => {},
}) {
  return (
    <Modal open={open} onClose={handleClose} data-cy="todo-modal-delete">
      <Box sx={style}>
        <div className="flex flex-col justify-center items-center p-4">
          <img
            src={ModalDeleteIconSvg}
            alt={ModalDeleteIconSvg}
            className="w-24 h-24 mb-4"
            data-cy="modal-delete-icon"
          />
          <p
            className="text-lg text-center mt-2 mb-4 font-medium"
            data-cy="modal-delete-title"
          >
            Apakah anda yakin menghapus activity <strong>“{title}”</strong>?
          </p>
          <div className="flex flex-row mt-2">
            <button
              className="px-12 py-4 btn-secondary mr-3"
              onClick={handleClose}
              data-cy="modal-delete-cancel-button"
            >
              Batal
            </button>
            <button
              className="px-12 py-4 btn-danger ml-3"
              onClick={onDelete}
              data-cy="modal-delete-confirm-button"
            >
              Hapus
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
