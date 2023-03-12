import React from "react";
import Navbar from "../components/navbar";
import AddButton from "../../components/addButton";

export default function AddPage() {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col py-4 px-64">
        <div className="flex flex-row justify-between items-center">
          <h2
            className="text-zinc-900 text-4xl font-bold"
            data-cy="activity-title"
          >
            Activity
          </h2>
          <AddButton />
        </div>
      </div>
    </div>
  );
}
