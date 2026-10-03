import "./App.css";

import { AddANewHabitButton } from "./components/askForAHabit";
import { useEffect, useState } from "react";
import { HiddenForm } from "./components/hiddenForm";
import { CreateAHabit } from "./components/CreateAHabit";
import { setInLocalStorage, getHabitsFromLocalStorage } from "./functions";
function App() {
  console.log();

  const [habits, setAHabit] = useState(getHabitsFromLocalStorage());
  // const [habits, setAHabit] = useState([{habit:"blabla"}]); test one

  console.log(habits);
  const [isItOpened, setIsItOpened] = useState(false);
  const [forEditing, setForEditing] = useState(false);
  const [editId, setEditId] = useState("");
  // useEffect(() => {
  //   setInLocalStorage(habits);
  //   console.log(habits);
  // }, [habits]);

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
              habit={habit}
              forEditing={forEditing}
              setForEditing={setForEditing}
              setEditId={setEditId}
              setIsItOpened={setIsItOpened}
            />
          );
        })}

        <HiddenForm
          isItOpened={isItOpened}
          setIsItOpened={setIsItOpened}
          habits={habits}
          setAHabit={setAHabit}
          forEditing={forEditing}
          editId={editId}
        />
      </div>
    </>
  );
}

export default App;
