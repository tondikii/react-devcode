import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import AddButton from "../components/AddButton";
import ActivityEmptyStateSvg from "../assets/activity-empty-state.svg";
import {api} from "../config/api";
import TodoCard from "../components/ToDoCard";
import ModalDelete from "../components/ModalDelete";
import ModalAlert from "../components/ModalAlert";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [item, setItem] = useState({id: 0, title: ""});
  const [showFeedback, setShowFeedback] = useState(false);

  const toggleModalDelete = () => setShowModalDelete(!showModalDelete);
  const toggleFeedback = () => setShowFeedback(!showFeedback);

  const getActivity = () => {
    setLoading(true);
    api
      .get("/activity-groups?email=tondiki@skyshi.com")
      .then(({data}) => {
        setData(data?.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getActivity();
  }, []);

  const onClickAdd = (e) => {
    e.preventDefault();
    api
      .post("/activity-groups", {
        title: "New Activity",
        email: "tondiki@skyshi.com",
      })
      .then(() => {
        getActivity();
      });
  };

  const handleDelete = () => {
    api.delete(`/activity-groups/${item?.id}`).then(() => {
      getActivity();
      toggleModalDelete();
      toggleFeedback();
    });
  };

  const Content = () => {
    const onClickDelete = ({id, title}) => {
      setItem({id, title});
      toggleModalDelete();
    };
    if (loading)
      return (
        <span className="text-black-custom text-2xl font-semibold">
          Loading...
        </span>
      );
    if (!data.length)
      return (
        <img
          src={ActivityEmptyStateSvg}
          className="w-2/3 h-2/3 cursor-pointer"
          alt={ActivityEmptyStateSvg}
          onClick={onClickAdd}
        />
      );
    return (
      <div className="grid gap-4 grid-cols-4 w-full">
        {data.map((e) => (
          <TodoCard
            key={e?.id}
            title={e?.title}
            created_at={e?.created_at}
            id={e?.id}
            onDelete={onClickDelete}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <ModalDelete
        open={showModalDelete}
        handleClose={toggleModalDelete}
        title={item?.title}
        onDelete={handleDelete}
      />
      <ModalAlert open={showFeedback} handleClose={toggleFeedback} />
      <div className="page-container">
        <Navbar />
        <div>
          <div className="flex flex-col mx-56">
            <div className="flex flex-row justify-between items-center my-12">
              <h2
                className="text-black-custom text-4xl font-bold"
                data-cy="activity-title"
              >
                Activity
              </h2>
              <AddButton onClick={onClickAdd} />
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
