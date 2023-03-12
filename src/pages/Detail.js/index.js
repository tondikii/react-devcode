import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../config/api";

import ToDoBackButtonSvg from "../../assets/todo-back-button.svg";
import ToDoSortButtonSvg from "../../assets/todo-sort-button.svg";
import ToDoTitleEditButtonSvg from "../../assets/todo-title-edit-button.svg";
import ToDoEmptyStateSvg from "../../assets/todo-empty-state.svg";

import TextField from "@mui/material/TextField";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/AddButton";
import ModalTodo from "../../components/ModalTodo";

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

  const toggleEditting = (e) => {
    if (isEditting) {
      handleUpdateTitle(e);
    }
    setIsEditting(!isEditting);
  };

  console.log({isEditting});

  const toggleModalTodo = () => {
    setShowModalTodo(!showModalTodo);
  };

  const getOneActivity = () => {
    setLoading(true);
    api
      .get(`/activity-groups/${id}`)
      .then(({data}) => {
        setItem(data || {});
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateTitle = (e) => {
    e.preventDefault();
    api.patch(`/activity-groups/${id}`, {title: item?.title}).finally(() => {
      setIsEditting(false);
    });
  };

  const handleCreateTodo = (todoForm) => {
    setLoadingCreate(true);
    const payload = {...todoForm, activity_group_id: id};
    console.log({payload});
    api
      .post("/todo-items", payload)
      .then(() => {
        toggleModalTodo();
        getOneActivity();
      })
      .finally(() => {
        setLoadingCreate(false);
      });
  };

  const Content = () => {
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
      <img
        src={ToDoEmptyStateSvg}
        className="w-7/12 h-7/12 cursor-pointer"
        alt={ToDoEmptyStateSvg}
        onClick={toggleModalTodo}
        data-cy="todo-empty-state"
      />
    );
    // return <h1>content</h1>;
  };

  useEffect(() => {
    getOneActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalTodo
        open={showModalTodo}
        handleClose={toggleModalTodo}
        onSubmit={handleCreateTodo}
        loading={loadingCreate}
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
    </>
  );
}
