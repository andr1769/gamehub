const demoForm = document.querySelector('.feedback-form');
const demoStatus = document.querySelector('#feedback-status');

demoForm.addEventListener('submit', event => {
  event.preventDefault();
  demoStatus.textContent = 'Форму успішно перевірено у браузері.';
});

demoForm.addEventListener('input', () => {
  demoStatus.textContent = '';
});

demoForm.querySelector('[type="submit"]').disabled = false;
