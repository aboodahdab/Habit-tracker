import "./App.css";

import { AddANewHabitButton } from "./components/addAHabit";
import { useEffect, useState } from "react";
import { HiddenForm } from "./components/hiddenForm";
import { CreateAHabit } from "./components/CreateAHabitHTML";
import { setInLocalStorage, getHabitsFromLocalStorage } from "./functions";
import { ShowNote } from "./components/showNoteOnClick";
function App() {
  console.log();

  const [habits, setAHabit] = useState(getHabitsFromLocalStorage());

  console.log(habits);
  const [currentHabit, setCurrentHabit] = useState([]);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isItOpened, setIsItOpened] = useState(false);
  const [forEditing, setForEditing] = useState(false);
  const [editId, setEditId] = useState("");
  useEffect(() => {
    setInLocalStorage(habits);
    console.log(habits);
  }, [habits]);

  return (
    <>
      <div className="flex flex-wrap gap-3  pt-4 pl-4">
        <AddANewHabitButton
          isItOpened={isItOpened}
          setIsItOpened={setIsItOpened}
        ></AddANewHabitButton>
        {habits.map((habit) => {
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
