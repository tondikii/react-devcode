import {useEffect, useState} from "react";
import {
  Modal,
  Box,
  Divider,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 830,
  // height: 403,
  borderRadius: "12px",
  bgcolor: "background.paper",
  boxShadow: 24,
  "&:focus": {
    outline: "none",
  },
};

const colourOptions = [
  {value: "very-high", label: "Very High", color: "#ED4C5C"},
  {value: "high", label: "High", color: "#F8A541"},
  {value: "normal", label: "Medium", color: "#00A790"},
  {value: "low", label: "Low", color: "#428BC1"},
  {value: "very-low", label: "Very Low", color: "#8942C1"},
];

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({...styles, backgroundColor: "white"}),
  option: (styles, {data}) => ({...styles, ...dot(data?.color)}),
  input: (styles) => ({...styles, ...dot()}),
  placeholder: (styles) => ({...styles, ...dot("#ccc")}),
  singleValue: (styles, {data}) => ({...styles, ...dot(data.color)}),
};

export default function ModalTodo({
  open = false,
  handleClose = () => {},
  onSubmit = () => {},
  loading = false,
  data = {},
}) {
  const [todoForm, setTodoForm] = useState({
    priority: "very-high",
    title: "",
  });

  useEffect(() => {
    setTodoForm({
      priority: "very-high",
      title: "",
    });
  }, [open]);

  useEffect(() => {
    if (data?.id) {
      setTodoForm(data);
    }
  }, [data]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} className="w-11/12 lg:w-7/12">
        <div className="px-4 md:px-4 py-2 md:py-4 flex justify-between items-center">
          <span className="text-lg font-medium" data-cy="modal-add-title">
            {data?.id ? "Edit" : "Tambah"} List Item
          </span>
          <IconButton
            onClick={handleClose}
            data-cy="modal-add-close-button"
            className="p-0 md:p-2"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />

        <div className="p-4 lg:p-8">
          <div className="mb-4 flex flex-col">
            <label
              className="text-xs md:text-sm font-semibold mb-1"
              data-cy="modal-add-name-title"
            >
              NAMA LIST ITEM
            </label>
            <TextField
              variant="outlined"
              placeholder="Tambahkan nama list item"
              value={todoForm?.title}
              onChange={(e) =>
                setTodoForm({...todoForm, title: e?.target?.value})
              }
              data-cy="modal-add-name-input"
            />
          </div>
          <div
            className="flex flex-col w-1/2 md:w-2/5 lg:w-1/4"
            data-cy="modal-add-priority-item, modal-add-priority-dropdown"
          >
            <label
              className="text-sm font-semibold mb-1"
              data-cy="modal-add-priority-title"
            >
              PRIORITY
            </label>
            <Select
              options={colourOptions}
              styles={colourStyles}
              value={
                colourOptions.find((e) => e?.value === todoForm?.priority) ||
                null
              }
              onChange={(e) => setTodoForm({...todoForm, priority: e?.value})}
            />
          </div>
        </div>
        <Divider />
        <div className="flex flex-row-reverse items-center p-6">
          <Button
            type="submit"
            variant="contained"
            className="rounded bg-primary add-button"
            style={{textTransform: "none"}}
            disabled={!todoForm?.title || loading}
            onClick={() => onSubmit(todoForm)}
            data-cy="modal-add-save-button"
          >
            <div className="py-1 lg:py-2 px-2 lg:px-5 flex flex-col justify-center">
              {loading ? (
                <CircularProgress size={20} />
              ) : (
                <span className="font-semibold ml-1 text-base lg:text-lg font-poppins">
                  Simpan
                </span>
              )}
            </div>
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
