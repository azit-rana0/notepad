import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Sidebar({
  notes,
  create,
  handleDelete,
  setCurrentActiveNoteId,
  currentActiveNoteId,
}) {
  const renderNoteList = notes.map((note) => {
    return (
      <li
        key={note.id}
        onClick={() => {
          setCurrentActiveNoteId(note.id);
        }}
        className={` flex justify-between border-b-2 px-2 py-2  cursor-pointer text-xl ${
          note.id === currentActiveNoteId
            ? "bg-[#3d91e7] text-white border-b-black"
            : ""
        }`}
      >
        <span className="">{note.body.split("\n")[0]}</span>
        <button
          className="cursor-pointer active:text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(note.id);
          }}
        >
          <MdDelete />
        </button>
      </li>
    );
  });
  return (
    <section className="w-[20%] h-screen bg-white">
      <div className="flex flex-wrap items-center justify-center gap-[1rem] p-[2rem] border-b-2">
        <h1 className="text-3xl">Notes</h1>
        <button className="cursor-pointer" onClick={create}>
          <FaPlusCircle className="text-blue-400 text-2xl " />
        </button>
      </div>
      <ul>{renderNoteList} </ul>
    </section>
  );
}
