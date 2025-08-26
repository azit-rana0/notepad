import MDEditor from "@uiw/react-md-editor";

export default function Editor({ currentNote, updateNote }) {
  return (
    <div className="w-full h-full text-[14px] bg-white" data-color-mode="light">
      {/* Desktop */}
      <div className="hidden md:block h-full">
        <MDEditor
          value={currentNote.body}
          onChange={updateNote}
          height="100%"
        />
      </div>

      {/* Mobile */}
      <div className="flex flex-col md:hidden h-full">
        <textarea
          value={currentNote.body}
          onChange={(e) => updateNote(e.target.value)}
          className="w-full h-1/2 border-b p-2 outline-none resize-none text-sm"
          placeholder="Write your note here..."
        />
        <div className="h-1/2 overflow-y-auto p-2 bg-gray-50">
          <MDEditor.Markdown source={currentNote.body} />
        </div>
      </div>
    </div>
  );
}
