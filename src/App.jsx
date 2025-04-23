import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Split from "react-split";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";

function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentActiveNoteId, setCurrentActiveNoteId] = useState(
    notes[0]?.id || null
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleCreate = () => {
    const newData = {
      id: nanoid(),
      body: "# Enter title here \n\n",
    };
    setNotes((prevsNote) => [...prevsNote, newData]);
    setCurrentActiveNoteId(newData.id);
  };

  const handleDelete = (id) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== id);

      // Reset active note if the deleted one was active
      if (id === currentActiveNoteId) {
        setCurrentActiveNoteId(updatedNotes[0]?.id || null);
      }

      return updatedNotes;
    });
  };

  const findCurrentNote = () => {
    return notes.find((note) => note.id === currentActiveNoteId);
  };

  const updateNote = (text) => {
    setNotes((prevsNote) => {
      let arr = [];
      for (let i = 0; i < prevsNote.length; i++) {
        if (prevsNote[i].id === currentActiveNoteId) {
          arr.push({ ...prevsNote[i], body: text });
        } else {
          arr.push(prevsNote[i]);
        }
      }
      return arr;
    });
  };

  return (
    <>
      {notes.length > 0 ? (
        <Split className="flex" sizes={[15, 85]} direction="horizontal">
          <Sidebar
            notes={notes}
            create={handleCreate}
            setCurrentActiveNoteId={setCurrentActiveNoteId}
            handleDelete={handleDelete}
            currentActiveNoteId={currentActiveNoteId}
          />
          {currentActiveNoteId && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
          <h1 className="text-4xl font-bold">You have no notes</h1>
          <button
            className="cursor-pointer bg-[#3d91e7] text-white text-2xl px-10 py-3 rounded-full font-medium"
            onClick={handleCreate}
          >
            Create one now
          </button>
        </div>
      )}
    </>
  );
}

export default App;
