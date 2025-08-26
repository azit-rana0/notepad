import { useState } from "react";
import { FaPlusCircle, FaBars } from "react-icons/fa";
import { MdDelete, MdPushPin } from "react-icons/md";

export default function Sidebar({
  notes,
  create,
  handleDelete,
  setCurrentActiveNoteId,
  currentActiveNoteId,
  sidebarOpen,
  setSidebarOpen,
  togglePin,
}) {
  const [search, setSearch] = useState("");

  // Filter notes by search text
  const filteredNotes = notes.filter((note) =>
    note.body.toLowerCase().includes(search.toLowerCase())
  );

  // Sort notes → pinned first
  const sortedNotes = [...filteredNotes].sort((a, b) => b.pinned - a.pinned);

  const renderNoteList = sortedNotes.map((note) => (
    <li
      key={note.id}
      onClick={() => {
        setCurrentActiveNoteId(note.id);
        setSidebarOpen(false);
      }}
      className={`flex justify-between items-center border-b px-2 py-2 text-lg cursor-pointer ${
        note.id === currentActiveNoteId ? "bg-blue-500 text-white" : ""
      }`}
    >
      <span className="truncate flex-1">{note.body.split("\n")[0]}</span>
      <div className="flex gap-2 items-center">
        {/* Pin button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePin(note.id);
          }}
          className={`${
            note.pinned ? "text-yellow-500" : "text-gray-400"
          } hover:text-yellow-600`}
        >
          <MdPushPin />
        </button>
        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(note.id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          <MdDelete />
        </button>
      </div>
    </li>
  ));

  return (
    <>
      {/* Mobile: toggle button */}
      <div className="md:hidden p-2 bg-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-bold">Notes</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-100 z-50 transform  transition-all duration-500 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl">Notes</h1>
          <button onClick={create}>
            <FaPlusCircle className="text-blue-600 text-2xl" />
          </button>
        </div>

        {/* Search bar */}
        <div className="p-2 border-b">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded border"
          />
        </div>

        {/* Notes list */}
        <ul className="overflow-y-auto max-h-[calc(100%-120px)]">
          {renderNoteList}
        </ul>
      </aside>
    </>
  );
}
