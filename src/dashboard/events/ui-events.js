export function initEvents({ mainWindow, toggleIcon, noteGroup, menuText, menuHead, line}) {
  setupToggleMenu({
    toggleIcon: toggleIcon,
    mainWindow: mainWindow,
    noteGroup: noteGroup,
    menuText: menuText,
    menuHead: menuHead,
    line: line
  });
}

function setupToggleMenu({ toggleIcon, mainWindow, noteGroup, menuText, menuHead, line }) {
  toggleIcon?.addEventListener('click', () => {
    toggleIcon?.classList.toggle('rotate-540');
    mainWindow?.classList.toggle('collapsed');
    mainWindow?.classList.toggle('uncollapsed'); 
    noteGroup?.classList.toggle('hidden');
    Array.from(menuText ?? []).forEach(el => el.classList.toggle('hidden'));
    Array.from(menuHead ?? []).forEach(el => el.classList.toggle('hidden'));
    line?.classList.toggle('hidden');
  });
}
