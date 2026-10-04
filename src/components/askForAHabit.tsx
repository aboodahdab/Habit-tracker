function AddANewHabitButton({ isItOpened, setIsItOpened }) {
  function openIt() {
    if (isItOpened === true) {
      console.log("already opened");
      return;
    }
    setIsItOpened(true);
  }
  return (
    <>
      <button
        onClick={openIt}
        aria-label="Add habit"
        className="border w-full border-dashed border-neutral-600 rounded-xl flex items-center justify-center text-neutral-500 cursor-pointer min-h-[128px] max-w-60"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      </button>
    </>
  );
}

export { AddANewHabitButton };
