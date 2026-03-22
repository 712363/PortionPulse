toggleContainer.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // save theme
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// load saved theme
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

const checkboxes = document.querySelectorAll('.check-item input');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const resetBtn = document.getElementById('resetBtn');

// LOAD saved checkbox states
checkboxes.forEach((cb, index) => {
  const saved = localStorage.getItem(`check-${index}`);
  if (saved === "true") cb.checked = true;
});

function updateProgress() {
  const total = checkboxes.length;
  const checked = document.querySelectorAll('.check-item input:checked').length;
  const percentage = (checked / total) * 100;

  progressFill.style.width = percentage + '%';
  progressText.textContent = `${checked} of ${total} tasks completed`;

  // SAVE checkbox states
  checkboxes.forEach((cb, index) => {
    localStorage.setItem(`check-${index}`, cb.checked);
  });
}

checkboxes.forEach(cb => {
  cb.addEventListener('change', updateProgress);
});

resetBtn.addEventListener('click', () => {
  checkboxes.forEach((cb, index) => {
    cb.checked = false;
    localStorage.removeItem(`check-${index}`);
  });
  updateProgress();
});

// INITIAL update 
updateProgress();

// NOTES / REFLECTION SAVING
const notes = document.getElementById("dailyNotes");

// Load saved notes
if (notes) {
  notes.value = localStorage.getItem("dailyNotes") || "";

  // Save notes while typing
  notes.addEventListener("input", () => {
    localStorage.setItem("dailyNotes", notes.value);
  });
}

const mealInputs = document.querySelectorAll('.meal-day input');
    const clearBtn = document.getElementById('clearPlanner');

    // Load saved meals
    mealInputs.forEach(input => {
      const key = `${input.dataset.day}-${input.dataset.meal}`;
      input.value = localStorage.getItem(key) || "";

      input.addEventListener("input", () => {
        localStorage.setItem(key, input.value);
      });
    });

    // Clear planner
    clearBtn.addEventListener("click", () => {
      mealInputs.forEach(input => {
        const key = `${input.dataset.day}-${input.dataset.meal}`;
        localStorage.removeItem(key);
        input.value = "";
      });
    });

    const saveBtn = document.querySelector('.save-meals-btn');

    saveBtn.addEventListener('click', () => {
    mealInputs.forEach(input => {
    const key = `${input.dataset.day}-${input.dataset.meal}`;
    localStorage.setItem(key, input.value);
  });

  alert("Meal plan saved!");
});