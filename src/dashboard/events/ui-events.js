import { workspace_title, workspaceHeader } from "../interface/components";
import { renderNoteComponents, noteEvents } from "../interface/notes/notes.render";

export function initEvents({ mainWindow, toggleIcon, noteGroup, menuText, menuHead, line }) {
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
    toggleIcon?.classList.toggle('rotate--180-icon');
    toggleIcon?.classList.toggle('rotate-180-icon');
    mainWindow?.classList.toggle('collapsed');
    mainWindow?.classList.toggle('uncollapsed');
    noteGroup?.classList.toggle('invisible');
    menu?.classList.toggle('invisible');
    Array.from(menuText ?? []).forEach(el => el.classList.toggle('invisible'));
    Array.from(menuHead ?? []).forEach(el => el.classList.toggle('hidden'));
    line?.classList.toggle('invisible');
  });
}

//init menuItems
function initMenuItems() {
  const tasksMenu = document.getElementById('tasks');
  const notesMenu = document.getElementById('notes');
  const calendarMenu = document.getElementById('calendar');

  console.log({ tasksMenu, notesMenu, calendarMenu });
  return {
    tasksMenu,
    notesMenu,
    calendarMenu
  };
}
//add functions to dynamically change workspace content
function eventMenuItems({ tasksMenu, notesMenu, calendarMenu }) {
  tasksMenu.addEventListener('click', () => {
    workspace_title.innerText = "Tasks";
    workspaceHeader.innerHTML = "";
  });
  notesMenu.addEventListener('click', () => {
    workspace_title.innerText = "Notes";

    renderNoteComponents();
    noteEvents()
    initNoteGroup();

  });
  calendarMenu.addEventListener('click', () => {
    workspace_title.innerText = "Calendar";
    workspaceHeader.innerHTML = "";
  });
}
//attach events and export to dashboard js
export function attachMenuEvents() {
  const items = initMenuItems();
  eventMenuItems(items);
}

