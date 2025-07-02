import { workspace_title, workspaceHeader, delFolderBtn, editFolderBtn, folderBtns } from "../interface/components";
import { initNotes } from "../interface/notes/notes.render";
import { folderEvents, initFolders } from "../interface/notes/folder-crud";

export function initEvents({ mainWindow, toggleIcon, noteGroup, menuText, menu, line, folderBtns }) {
  setupToggleMenu({
    toggleIcon: toggleIcon,
    mainWindow: mainWindow,
    noteGroup: noteGroup,
    menuText: menuText,
    menu: menu,
    line: line,
    folderBtns: folderBtns
  });
}

function setupToggleMenu({ toggleIcon, mainWindow, noteGroup, menuText, menu, line, folderBtns }) {
  toggleIcon?.addEventListener('click', () => {
    toggleIcon?.classList.toggle('rotate-180');
    mainWindow?.classList.toggle('collapsed');
    mainWindow?.classList.toggle('uncollapsed');
    noteGroup?.classList.toggle('invisible');
    menu?.classList.toggle('invisible');
    folderBtns?.classList.toggle('invisible');
    Array.from(menuText ?? []).forEach(el => el.classList.toggle('invisible'));
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

    //group these
    initNotes()

  });
  calendarMenu.addEventListener('click', () => {
    workspace_title.innerText = "Calendar";
    workspaceHeader.innerHTML = "";
  });
}

//attach menu and folder events, export to dashboard js
export function attachMenuEvents() {
  const items = initMenuItems();
  eventMenuItems(items);
  folderEvents(editFolderBtn, delFolderBtn);
}
