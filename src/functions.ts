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
  localStorage.setItem("habits", stringified_query);
}
function deleteHabit(event) {
  const target = event.target;
  const parent = target.parentElement.parentElement;
  const id = parent.dataset.id;
  parent.remove();
  deleteFromLocalStorage(id);
}

function deleteFromLocalStorage(id: string) {
  let habits = getHabitsFromLocalStorage();
  for (let i = 0; i < habits.length; i += 1) {
    const current_habit = habits[i];
    if (current_habit["id"] === id) {
      // remove by index
      habits = habits.filter((item, index) => index !== i);
    }
  }
  setInLocalStorage(habits);
}
function editHabit(editingData, id) {

  const habits = getHabitsFromLocalStorage();
  let array = [];

  habits.map((element) => {

    if (element.id === id) {
      array.push(editingData);
      return;
    }
    array.push(element);
  });
  setInLocalStorage(array);
}

export {
  getHabitsFromLocalStorage,
  deleteHabit,
  editHabit,
  deleteFromLocalStorage,
  setInLocalStorage,
};
