function getHabitsFromLocalStorage() {
  const data = localStorage.getItem("habits");
  const parsed_data = JSON.parse(data);

  if (!parsed_data) {
    return [];
  }
  return parsed_data;
}

function setInLocalStorage(habits: object) {
  const stringified_query = JSON.stringify(habits);
  console.log("setting habit in local storage....... ");
  localStorage.setItem("habits", stringified_query);
}

function deleteHabit(event, setAHabit, habits) {
  const target = event.target;
  const parent = target.parentElement.parentElement;
  const id = parent.dataset.id;
  console.log(id);

  deleteFromLocalStorage(id, setAHabit, habits);
}

function deleteFromLocalStorage(id: string, setAHabit, habits) {
  for (let i = 0; i < habits.length; i += 1) {
    const current_habit = habits[i];
    if (current_habit["id"] === id) {
      // remove by index
      habits = habits.filter((item, index) => index !== i);
    }
  }
  setAHabit(habits);
}

function editHabit(editingData, id, setAHabit, habits) {
  let array = [];

  habits.map((element) => {
    if (element.id === id) {
      console.log(editingData);
      array.push(editingData);
      return;
    }
    array.push(element);
  });
  console.log(array);
  setAHabit(array);
}

function checkInput(inputValue, notes, clickTimes) {
  if (inputValue.length > 50) {
    console.log("Name is too big.");
    return;
  }
  if (inputValue === "") {
    console.log("Nothing got entered.");
    return;
  }
  if (notes.length > 150) {
    console.log("Note is too big, max is 150 characters.");
    return;
  }
  if (clickTimes > 25) {
    console.log(
      "Who does something more than 25 times a day? (other than breathing I guess)",
    );
    return;
  }
  return true;
}
function decrementCompletionTimes(habits, id, setAHabit) {
  const array = [];
  habits.map((habit) => {
    const timesPerDay = habit["timesPerDay"];
    if (habit.id === id) {
      habit["timesOfCompletion"] -= 1;
      if (habit["timesOfCompletion"] < timesPerDay) {
        habit["done"] = false;
      }
    }
    array.push(habit);
  });
  setAHabit(array);
}
function incrementCompletionTimes(habits, id, setAHabit) {
  const array = [];
  habits.map((habit) => {
    const timesPerDay = habit["timesPerDay"];
    if (habit.id === id) {
      if (habit["timesOfCompletion"] < timesPerDay) {
        habit["timesOfCompletion"] += 1;
      }
      if (habit["timesOfCompletion"] >= timesPerDay) {
        console.log("that is done");
        habit["done"] = true;
        array.push(habit);
        return;
      }
    }
    array.push(habit);
  });
  setAHabit(array);
}

function filterTasks(doneOrNot, habits) {
  const filteredArray = [];
  habits.map((habit) => {
    const isHabitDone = habit["done"];
    if (isHabitDone === doneOrNot) {
      filteredArray.push(habit);
    }
  });
  console.log(filteredArray);
  return filteredArray;
}
function filteringHandler(state, habits, setFilteredHabits) {
  let result = [];
  if (state === "All") {
    console.log("All filter checked");

    return habits;
  } else if (state === "To-do") {
    console.log("to do filter checked");
    result = filterTasks(false, habits);
  } else if (state === "Done") {
    result = filterTasks(true, habits);
  }
  setFilteredHabits(result);
  return result;
}
function setThemeColor(value) {
  // param value is either true or false (true === dark, false=== light )
  localStorage.setItem("theme", JSON.stringify(value));
}
function getThemeColor() {
  const theme = JSON.parse(localStorage.getItem("theme"));
  if (!theme) {
    // set light as default
    return false;
  }
  return theme;
}
export {
  getThemeColor,
  setThemeColor,
  filteringHandler,
  filterTasks,
  decrementCompletionTimes,
  incrementCompletionTimes,
  checkInput,
  getHabitsFromLocalStorage,
  deleteHabit,
  editHabit,
  deleteFromLocalStorage,
  setInLocalStorage,
};
