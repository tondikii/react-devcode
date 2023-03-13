import {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../config/api";

import ToDoBackButtonSvg from "../../assets/todo-back-button.svg";
import ToDoSortButtonSvg from "../../assets/todo-sort-button.svg";
import ToDoTitleEditButtonSvg from "../../assets/todo-title-edit-button.svg";
import ToDoEmptyStateSvg from "../../assets/todo-empty-state.svg";

import TextField from "@mui/material/TextField";
import ToDoListCard from "../../components/ToDoListCard";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/AddButton";
import ModalTodo from "../../components/ModalTodo";
import ToggleFilter from "../../components/ToggleFilter";
import ModalDelete from "../../components/ModalDelete";

export default function DetailPage() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [item, setItem] = useState({
    id: 0,
    title: "",
    created_at: "",
    todo_items: [],
  });
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [showModalTodo, setShowModalTodo] = useState(false);
  const [selectedTodoItem, setSelectedTodoItem] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [tempTodoItems, setTempTodoItems] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const open = Boolean(anchorEl);

  const handleClickFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const toggleModalDelete = () => setShowModalDelete(!showModalDelete);
  const toggleEditting = (e) => {
    if (isEditting) {
      handleUpdateTitle(e);
    }
    setIsEditting(!isEditting);
  };

  const toggleModalTodo = () => {
    setShowModalTodo(!showModalTodo);
  };

  const getOneActivity = () => {
    setLoading(true);
    api
      .get(`/activity-groups/${id}`)
      .then(({data}) => {
        setItem(data || {});
        setTempTodoItems(data?.todo_items || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = () => {
    api.delete(`/todo-items/${selectedTodoItem?.id}`).then(() => {
      getOneActivity();
      toggleModalDelete();
      selectedTodoItem({});
    });
  };

  const handleUpdateTitle = (e) => {
    e.preventDefault();
    api.patch(`/activity-groups/${id}`, {title: item?.title}).finally(() => {
      setIsEditting(false);
    });
  };

  const handleCheckTodo = (todoItem) => {
    api
      .patch(`/todo-items/${todoItem?.id}`, {
        is_active: todoItem?.is_active ? 0 : 1,
      })
      .then(() => {
        api.get(`/activity-groups/${id}`).then(({data}) => {
          setItem(data || {});
        });
      });
  };

  const handleSubmitTodo = (todoForm) => {
    setLoadingCreate(true);
    const payload = {...todoForm, activity_group_id: id};
    if (payload?.id) {
      api
        .patch(`/todo-items/${selectedTodoItem?.id}`, {
          is_active: payload?.is_active,
          priority: payload?.priority,
          title: payload?.title,
        })
        .then(() => {
          toggleModalTodo();
          getOneActivity();
          setSelectedTodoItem({});
        })
        .finally(() => {
          setLoadingCreate(false);
        });
    } else {
      api
        .post("/todo-items", payload)
        .then(() => {
          toggleModalTodo();
          getOneActivity();
        })
        .finally(() => {
          setLoadingCreate(false);
        });
    }
  };

  const Content = () => {
    const onEditTodoItem = (todoItem) => {
      setSelectedTodoItem(todoItem);
      toggleModalTodo();
    };
    if (loading)
      return (
        <span className="text-black-custom text-2xl font-semibold">
          Loading...
        </span>
      );
    if (!item?.todo_items?.length)
      return (
        <img
          src={ToDoEmptyStateSvg}
          className="w-7/12 h-7/12 cursor-pointer"
          alt={ToDoEmptyStateSvg}
          onClick={toggleModalTodo}
          data-cy="todo-empty-state"
        />
      );
    return (
      <div className="flex flex-col w-full mt-4">
        {item?.todo_items.map((todoItem) => (
          <div className="mb-2">
            <ToDoListCard
              data={todoItem}
              key={todoItem?.id}
              onEdit={onEditTodoItem}
              onCheck={handleCheckTodo}
              onDelete={() => {
                toggleModalDelete();
                setSelectedTodoItem(todoItem);
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    getOneActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const todoItems = [...tempTodoItems];
    switch (selectedFilter) {
      case "Terbaru":
        setItem({...item, todo_items: todoItems});
        break;
      case "Terlama":
        setItem({...item, todo_items: todoItems.reverse()});
        break;
      case "A-Z":
        todoItems.sort((a, b) => {
          const nameA = a.title.toUpperCase(); // ignore upper and lowercase
          const nameB = b.title.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        setItem({...item, todo_items: todoItems});
        break;
      case "Z-A":
        todoItems.sort((a, b) => {
          const nameA = a.title.toUpperCase(); // ignore upper and lowercase
          const nameB = b.title.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          // names must be equal
          return 0;
        });
        setItem({...item, todo_items: todoItems});
        break;
      case "Belum Selesai":
        todoItems.sort((a, b) => a?.is_active - b?.is_active);
        setItem({...item, todo_items: todoItems.reverse()});
        break;
      default:
        setItem({...item, todo_items: todoItems});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return (
    <Fragment>
      <ModalDelete
        open={showModalDelete}
        handleClose={toggleModalDelete}
        title={item?.title}
        onDelete={handleDelete}
        isTodo
      />
      <ModalTodo
        open={showModalTodo}
        handleClose={toggleModalTodo}
        onSubmit={handleSubmitTodo}
        loading={loadingCreate}
        data={selectedTodoItem}
      />
      <div className="page-container">
        <Navbar />
        <div>
          <div className="flex flex-col mx-56">
            <div className="flex flex-row justify-between items-center my-12">
              <div className="flex flex-row items-center">
                <img
                  src={ToDoBackButtonSvg}
                  alt={ToDoBackButtonSvg}
                  className="w-9 h-9 mr-4 cursor-pointer"
                  onClick={() => navigate(-1)}
                  data-cy="todo-back-button"
                  role="button"
                />
                {isEditting ? (
                  <form onSubmit={handleUpdateTitle}>
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      value={item?.title}
                      onChange={(e) =>
                        setItem({...item, title: e?.target?.value})
                      }
                    />
                  </form>
                ) : (
                  <h2
                    className="text-black-custom text-4xl font-bold"
                    data-cy="todo-title"
                  >
                    {item?.title}
                  </h2>
                )}

                <img
                  src={ToDoTitleEditButtonSvg}
                  alt={ToDoTitleEditButtonSvg}
                  className="w-7 h-7 cursor-pointer ml-4"
                  data-cy="todo-title-edit-button"
                  role="button"
                  onClick={toggleEditting}
                />
              </div>
              <div className="flex flex-row items-center">
                <img
                  src={ToDoSortButtonSvg}
                  alt={ToDoSortButtonSvg}
                  className="w-18 h-18 cursor-pointer mr-4"
                  data-cy="todo-sort-button"
                  role="button"
                  onClick={handleClickFilter}
                />
                <ToggleFilter
                  open={open}
                  anchorEl={anchorEl}
                  handleClose={handleCloseFilter}
                  selected={selectedFilter}
                  setSelected={setSelectedFilter}
                />
                <AddButton dataCy="todo-add-button" onClick={toggleModalTodo} />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              {Content()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
