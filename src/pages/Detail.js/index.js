import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../config/api";

import Navbar from "../../components/Navbar";
import AddButton from "../../components/AddButton";
import ToDoBackButtonSvg from "../../assets/todo-back-button.svg";
import ToDoSortButtonSvg from "../../assets/todo-sort-button.svg";
import ToDoTitleEditButtonSvg from "../../assets/todo-title-edit-button.svg";
import ToDoEmptyStateSvg from "../../assets/todo-empty-state.svg";

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

  const onClickAdd = (e) => {
    e.preventDefault();
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

  useEffect(() => {
    getOneActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onClick={onClickAdd}
          data-cy="todo-empty-state"
        />
      );
    return <h1>content</h1>;
  };

  return (
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
              <h2
                className="text-black-custom text-4xl font-bold"
                data-cy="todo-title"
              >
                {item?.title}
              </h2>
              <img
                src={ToDoTitleEditButtonSvg}
                alt={ToDoTitleEditButtonSvg}
                className="w-7 h-7 cursor-pointer ml-4"
                data-cy="todo-title-edit-button"
                role="button"
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
              <AddButton dataCy="todo-add-button" />
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            {Content()}
          </div>
        </div>
      </div>
    </div>
  );
}
