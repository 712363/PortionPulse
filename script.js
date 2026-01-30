toggleContainer.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

 const checkboxes = document.querySelectorAll('.check-item input');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const resetBtn = document.getElementById('resetBtn');

    function updateProgress() {
      const total = checkboxes.length;
      const checked = document.querySelectorAll('.check-item input:checked').length;
      const percentage = (checked / total) * 100;

      progressFill.style.width = percentage + '%';
      progressText.textContent = `${checked} of ${total} tasks completed`;
    }

    checkboxes.forEach(cb => {
      cb.addEventListener('change', updateProgress);
    });

    resetBtn.addEventListener('click', () => {
      checkboxes.forEach(cb => cb.checked = false);
      updateProgress();
    });