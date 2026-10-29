import "./App.css";

import { AddANewHabitButton } from "./components/addAHabit";
import { useEffect, useState } from "react";
import { HiddenForm } from "./components/hiddenForm";
import { CreateAHabit } from "./components/CreateAHabitHTML";
import {
  setInLocalStorage,
  getHabitsFromLocalStorage,
  filteringHandler,
  getThemeColor,
  setThemeColor,
} from "./functions";
import { ShowNote } from "./components/showNoteOnClick";
function App() {
  console.log();

  const [habits, setAHabit] = useState(getHabitsFromLocalStorage());
  const [isThemeDark, setIsThemeDark] = useState(getThemeColor());
  console.log(habits);
  const [currentHabit, setCurrentHabit] = useState([]);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isItOpened, setIsItOpened] = useState(false);
  const [forEditing, setForEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [highLightedElement, setHighLightedElement] = useState("All");
  // default value of filitered habits should be none since the website starts with the filiter "All"
  const [filiteredHabits, setFilteredHabits] = useState([]);
  // const [sortBy, setSortBy] = useState("newest-first"); add dates first
  useEffect(() => {
    setInLocalStorage(habits);
    console.log(habits);
  }, [habits]);

  useEffect(() => {
    const filtered = filteringHandler(
      highLightedElement,
      habits,
      setFilteredHabits,
    );
    console.log("filter:", filtered);
    //  didn't call setfilteredHabits here because it will cause an error
  }, [highLightedElement]);

  useEffect(() => {
    // change colors to dark/light
    console.log("theme has changed", isThemeDark === true ? "dark" : "light");
  }, [isThemeDark]);

  return (
    <>
      <button
        aria-label="Toggle dark theme"
        onClick={() => {
          const previousTheme = getThemeColor();
          const newTheme = !previousTheme;
          setThemeColor(newTheme);
          setIsThemeDark(newTheme);
        }}
        className="fixed top-4 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-600 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 cursor-pointer transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
      >
        <svg
          className="hidden dark:block"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </svg>
        <svg
          className="block dark:hidden"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
        </svg>
      </button>
      <div className="w-full flex flex-wrap items-center justify-center gap-3 mb-2 mt-4">
        <div
          className="inline-flex items-center h-9 p-0.5 bg-neutral-900 border border-neutral-800 rounded-lg"
          onClick={(e) => {
            const target = e.target;
            setHighLightedElement(target.dataset.filter);
          }}
        >
          <button
            data-filter="All"
            className={`h-8 px-3.5 text-sm font-medium rounded-md ${highLightedElement === "All" ? "bg-neutral-800" : "bg-red-600"} text-neutral-50  ring-1 ring-neutral-700 cursor-pointer transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neutral-500`}
          >
            All
          </button>
          <button
            data-filter="To-do"
            className={`h-8 px-3.5 text-sm ${highLightedElement === "To-do" ? "bg-neutral-800" : "bg-red-600"} rounded-md text-neutral-400 hover:text-neutral-200 cursor-pointer transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neutral-500`}
          >
            To do
          </button>
          <button
            data-filter="Done"
            className={`h-8 px-3.5 text-sm rounded-md ${highLightedElement === "Done" ? "bg-neutral-800" : "bg-red-600"} text-neutral-400 hover:text-neutral-200 cursor-pointer transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-neutral-500`}
          >
            Done
          </button>
        </div>

        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 9l4 -4l4 4m-4 -4v14" />
            <path d="M21 15l-4 4l-4 -4m4 4v-14" />
          </svg>
          <select
            aria-label="Sort habits"
            className="h-9 appearance-none bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-9 text-sm text-neutral-200 cursor-pointer hover:border-neutral-700 outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 [color-scheme:dark]"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">A to Z</option>
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 9l6 6l6 -6" />
          </svg>
        </div>
      </div>
      <div className="flex flex-wrap gap-3  pt-4 pl-4">
        <AddANewHabitButton
          isItOpened={isItOpened}
          setIsItOpened={setIsItOpened}
        ></AddANewHabitButton>
        {highLightedElement === "All"
          ? habits.map((habit) => {
              return (
                <CreateAHabit
                  habits={habits}
                  setAHabit={setAHabit}
                  key={habit.id}
                  isNoteOpen={isNoteOpen}
                  setIsNoteOpen={setIsNoteOpen}
                  habit={habit}
                  forEditing={forEditing}
                  setForEditing={setForEditing}
                  setEditId={setEditId}
                  setIsItOpened={setIsItOpened}
                  setCurrentHabit={setCurrentHabit}
                />
              );
            })
          : filiteredHabits.map((habit) => {
              return (
                <CreateAHabit
                  habits={habits}
                  setAHabit={setAHabit}
                  key={habit.id}
                  isNoteOpen={isNoteOpen}
                  setIsNoteOpen={setIsNoteOpen}
                  habit={habit}
                  forEditing={forEditing}
                  setForEditing={setForEditing}
                  setEditId={setEditId}
                  setIsItOpened={setIsItOpened}
                  setCurrentHabit={setCurrentHabit}
                />
              );
            })}

        <HiddenForm
          isItOpened={isItOpened}
          setIsItOpened={setIsItOpened}
          habits={habits}
          setAHabit={setAHabit}
          forEditing={forEditing}
          setForEditing={setForEditing}
          editId={editId}
        />
        <ShowNote
          isNoteOpen={isNoteOpen}
          currentHabit={currentHabit}
          setIsNoteOpen={setIsNoteOpen}
        />
      </div>
    </>
  );
}

export default App;
