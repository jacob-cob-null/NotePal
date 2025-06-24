export function initEvents({ mainWindow, toggleIcon, noteGroup }) {
  setupToggleMenu({
    trigger: toggleIcon,
    target: mainWindow,
    target2: noteGroup,
  });
}

function setupToggleMenu({ trigger, target, target2 }) {
  trigger.addEventListener('click', () => {
    target.classList.toggle('collapsed');
    target.classList.toggle('uncollapsed');
    target2.classList.toggle('hidden');
  });
}
