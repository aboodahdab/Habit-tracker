import { useState } from "react";
import { editHabit } from "../functions";
type input = {
  isItOpened: boolean;
  setIsItOpened: (isItOpened: boolean) => void;
  habits: object;
  setAHabit: (habit: object) => void;
  editId: string;
};
function HiddenForm({
  isItOpened,
  setIsItOpened,
  habits,
  setAHabit,
  forEditing,
  editId,
}: input) {
  const [IsPickerShown, setIsPickerShown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [repeats, setRepeats] = useState([]);
  const [timesOfClick, setTimesOfClick] = useState(1);
  const [clickTimes, setClickTimes] = useState(1);
  //   coming soon:
  //   const [icons,setIcons]=useState(null)

  const [notes, setNotes] = useState("");
  function editHandler() {
    if (!checkInput) {
      console.log("yeahhhh");
      return;
    }
    editHabit({
      id:editId,
      name: inputValue,
      repeatings: repeats,
      timesPerDay: clickTimes,
      note: notes,
    },editId);
    setIsItOpened(false);
  }
  function itsClicked(event) {
    setTimesOfClick(timesOfClick + 1);
    const element: HTMLElement = event.target;
    const datasetValue = element.dataset.value;
    element.classList.toggle("bg-neutral-100");
    element.classList.toggle("text-neutral-900");
    element.classList.toggle("text-neutral-400");
    // console.log(repeats.includes(datasetValue));

    if (timesOfClick % 2 === 0) {
      if (repeats.includes(datasetValue)) {
        const repeats2 = repeats.filter((x) => x !== datasetValue);

        setRepeats(repeats2);
        return;
      }
    }

    setRepeats([...repeats, datasetValue]);
  }

  function closeModal() {
    setIsItOpened(false);
  }
  function checkInput() {
    if (inputValue.length > 50) {
      console.log("Name is too big");
      return;
    }
    if (inputValue === "") {
      console.log("nothing got entered");
      return;
    }
    if (notes.length > 150) {
      console.log("notes are too big, max is 150 characters");
      return;
    }
    if (clickTimes > 100) {
      console.log(
        "who does something 100 times a day? (other than breathing I guess)",
      );
      return;
    }
  }
  function addAHabit() {
    // check if the input is ok.
    if (!checkInput) {
      return;
    }


    const query = [
      ...habits,
      {
        id: crypto.randomUUID(),
        name: inputValue,
        repeatings: repeats,
        timesPerDay: clickTimes,
        note: notes,
      },
    ];

    console.log(habits);
    setAHabit(query);

    setIsItOpened(false);
  }
  return (
    <>
      <div
        id="habitModal"
        className={` ${isItOpened === false ? "hidden" : ""} fixed inset-0 bg-black/60 flex items-center justify-center z-50`}
      >
        <div className="bg-neutral-800 rounded-xl p-6 w-80 relative">
          {/* <!-- Close button --> */}
          <button
            // onClick={document.getElementById('habitModal').classList.add('hidden')"
            aria-label="Close"
            onClick={closeModal}
            className="absolute top-3 right-3 text-neutral-400 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          <h3 className="text-neutral-100 text-sm font-medium mb-4">
            New habit
          </h3>

          <input
            onChange={(e) => {
              const value = e.target.value;
              console.log(value);
              setInputValue(value);
            }}
            type="text"
            placeholder="Habit name"
            className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 mb-4"
          />

          <p className="text-xs text-neutral-400 mb-2">Icon</p>
          <div className="flex gap-2 mb-4"></div>

          <label className="flex items-center justify-between mb-4 text-sm text-neutral-300">
            Times per day
            <input
              type="number"
              min="1"
              onChange={(e) => {
                const value = +e.target.value;
                // convert to int with +

                setClickTimes(+value);
              }}
              className="w-16 bg-neutral-900 border border-neutral-600 rounded-lg px-2 py-1 text-sm text-neutral-100 text-center"
            />
          </label>

          <label className="flex items-center gap-2 mb-3 text-sm text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => {
                // toggle it
                const currentState = e.target.checked;

                if (currentState) {

                  setIsPickerShown(true);
                  return;
                }

                setIsPickerShown(false);
              }}
              className="cursor-pointer"
            />
            Repeats
          </label>

          <div
            id="dayPicker"
            className={`${IsPickerShown === false ? "hidden" : ""}  mb-4`}
          >
            <p className="text-xs text-neutral-400 mb-2">Repeat on </p>
            <div className="flex gap-1.5">
              <button
                data-value="Su"
                type="button"
                onClick={itsClicked}
                className="w-8 h-8 rounded-full text-xs text-neutral-400 border border-neutral-600 cursor-pointer"
              >
                Su
              </button>
              <button
                data-value="M"
                type="button"
                onClick={itsClicked}
                className="w-8 h-8 rounded-full text-xs text-neutral-400 border border-neutral-600 cursor-pointer"
              >
                M
              </button>
              <button
                data-value="Tu"
                type="button"
                onClick={itsClicked}
                className="w-8 h-8 rounded-full text-xs text-neutral-400 border border-neutral-600 cursor-pointer"
              >
                Tu
              </button>
              <button
                data-value="W"
                type="button"
                onClick={itsClicked}
                className="w-8 h-8 rounded-full text-xs text-neutral-400 border border-neutral-600 cursor-pointer"
              >
                W
              </button>
              <button
                data-value="Th"
                type="button"
                onClick={itsClicked}
                className="w-8 h-8 rounded-full text-xs text-neutral-400 border border-neutral-600 cursor-pointer"
              >
                Th
              </button>
              <button
                data-value="F"
                type="button"
                onClick={itsClicked}
                className="w-8 h-8 rounded-full text-xs text-neutral-400 border border-neutral-600 cursor-pointer"
              >
                F
              </button>
              <button
                data-value="Sa"
                type="button"
                onClick={itsClicked}
                className="w-8 h-8 rounded-full text-xs text-neutral-400 border border-neutral-600 cursor-pointer"
              >
                Sa
              </button>
            </div>
          </div>

          <textarea
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            placeholder="Note (optional)"
            className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 mb-4 resize-none"
          ></textarea>

          <button
            className="w-full bg-neutral-100 text-neutral-900 text-sm font-medium py-2 rounded-lg cursor-pointer"
            onClick={() => {
              if (forEditing === false) {
                addAHabit();
                return;
              }
              if (forEditing === true) {
                editHandler();
              }
            }}
          >
            Add habit
          </button>
        </div>
      </div>
    </>
  );
}
export { HiddenForm };
