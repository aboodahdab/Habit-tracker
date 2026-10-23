function ShowNote({ isNoteOpen, currentHabit, setIsNoteOpen }) {
  const note = currentHabit["note"];
  const name = currentHabit["name"];
  // const streak=currentHabit["streak"]
  // const imoji=currentHabit["imoji"]
  return (
    <>
      {isNoteOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setIsNoteOpen(false)}
        >
          <div
            className="relative w-full max-w-sm bg-neutral-800 border border-neutral-700 rounded-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsNoteOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-neutral-400 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-xl">
                💧
              </span>
              <div>
                <p className="text-sm font-medium text-neutral-100">{name}</p>
                <p className="text-xs text-neutral-400">12 day streak</p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 mb-2">Note</p>
            <p className="bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-sm text-neutral-200 leading-relaxed">
              {note}
            </p>

            <button
              onClick={() => setIsNoteOpen(false)}
              className="w-full mt-4 bg-neutral-100 text-neutral-900 text-sm font-medium py-2 rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export { ShowNote };
