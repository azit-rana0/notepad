import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";

export default function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentActiveNoteId, setCurrentActiveNoteId] = useState(
    notes[0]?.id || null
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function handleCreate() {
    const newNote = {
      id: nanoid(),
      body: "# Enter title here\n\n",
      pinned: false,
    };
    setNotes((prev) => [...prev, newNote]);
    setCurrentActiveNoteId(newNote.id);
  }

  function handleDelete(id) {
    setNotes((prev) => {
      const updated = prev.filter((note) => note.id !== id);
      if (id === currentActiveNoteId) {
        setCurrentActiveNoteId(updated[0]?.id || null);
      }
      return updated;
    });
  }

  function findCurrentNote() {
    return notes.find((note) => note.id === currentActiveNoteId);
  }

  function updateNote(text) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === currentActiveNoteId ? { ...note, body: text } : note
      )
    );
  }

  function togglePin(id) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  }

  return notes.length > 0 ? (
    <>
      <div className="h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar
          notes={notes}
          create={handleCreate}
          handleDelete={handleDelete}
          setCurrentActiveNoteId={setCurrentActiveNoteId}
          currentActiveNoteId={currentActiveNoteId}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          togglePin={togglePin}
        />

        {/* Editor */}
        {currentActiveNoteId && (
          <div
            className={`flex-1 transition-all duration-500   ${
              sidebarOpen ? "blur-sm pointer-events-none" : ""
            } md:blur-0 md:pointer-events-auto`}
            onClick={() => setSidebarOpen(false)}
          >
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          </div>
        )}
      </div>
    </>
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl font-bold">You have no notes</h1>
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white text-2xl px-10 py-3 rounded-full"
      >
        Create One Now
      </button>
    </div>
  );
}
