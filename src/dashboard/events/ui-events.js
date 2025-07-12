import { workspace_title, workspaceHeader, delFolderBtn, editFolderBtn, folderBtns, mainWorkspace } from "../interface/components";
import { initNotes, displayNotes } from "../interface/notes/notes.render";
import { folderEvents, initFolders } from "../interface/notes/folder-crud";
import { initTodo } from "../interface/todo-list/todo.render";
import { initCalendar } from "../interface/calendar/calendar-setup";
import { initPomodoro } from "../interface/pomodoro/pomodoro.render";
import { loadEventsFromTodos } from "../interface/calendar/calendar-function";
import { getAllTodoObjects } from "../interface/todo-list/todo-object";


export function initEvents({ mainWindow, toggleIcon, noteGroup, burger, menuText, menu, line, folderBtns }) {
  setupToggleMenu({
    toggleIcon: toggleIcon,
    mainWindow: mainWindow,
    noteGroup: noteGroup,
    menuText: menuText,
    menu: menu,
    burger: burger,
    line: line,
    folderBtns: folderBtns
  });
}

function setupToggleMenu({ toggleIcon, mainWindow, noteGroup, menuText, menu, line, folderBtns, burger }) {
  // Desktop toggle
  toggleIcon?.addEventListener('click', () => {
    toggleIcon?.classList.toggle('rotate-180');

    // Only toggle desktop classes
    if (window.innerWidth >= 640) { // sm breakpoint
      mainWindow?.classList.toggle('collapsed');
      mainWindow?.classList.toggle('uncollapsed');
    }

    noteGroup?.classList.toggle('invisible');
    menu?.classList.toggle('invisible');
    folderBtns?.classList.toggle('invisible');
    Array.from(menuText ?? []).forEach(el => el.classList.toggle('invisible'));
    line?.classList.toggle('invisible');
  });

  // Mobile toggle
  burger?.addEventListener('click', () => {
    // Only toggle mobile classes
    if (window.innerWidth < 640) { // sm breakpoint
      if (mainWindow?.classList.contains('collapsed-m')) {
        mainWindow?.classList.remove('collapsed-m');
        mainWindow?.classList.add('uncollapsed-m');
      } else {
        mainWindow?.classList.remove('uncollapsed-m');
        mainWindow?.classList.add('collapsed-m');
      }
    }

  })
}
//init menuItems
function initMenuItems() {
  const tasksMenu = document.getElementById('tasks');
  const notesMenu = document.getElementById('notes');
  const calendarMenu = document.getElementById('calendar');
  const pomodoroMenu = document.getElementById('pomodoro');

  console.log({ tasksMenu, notesMenu, calendarMenu });
  return {
    tasksMenu,
    notesMenu,
    calendarMenu,
    pomodoroMenu
  };
}
//add functions to dynamically change workspace content
function eventMenuItems({ tasksMenu, notesMenu, calendarMenu, pomodoroMenu }) {
  tasksMenu.addEventListener('click', () => {
    workspace_title.innerText = "Tasks";
    workspaceHeader.innerHTML = "";
    if (mainWorkspace.classList.contains('justify-center')) {
      mainWorkspace.classList.remove('justify-center')
    }
    mainWorkspace.innerHTML = '';
    initTodo()
  });
  notesMenu.addEventListener('click', () => {
    workspace_title.innerText = "Notes";
    mainWorkspace.innerHTML = '';
    if (mainWorkspace.classList.contains('justify-center')) {
      mainWorkspace.classList.remove('justify-center')
    }
    //group these
    initNotes();
    displayNotes();

  });
  calendarMenu.addEventListener('click', () => {
    workspace_title.innerText = "Calendar";
    if (mainWorkspace.classList.contains('justify-center')) {
      mainWorkspace.classList.remove('justify-center')
    }
    workspaceHeader.innerHTML = "";
    mainWorkspace.innerHTML = '';
    initCalendar(mainWorkspace)
    loadEventsFromTodos(getAllTodoObjects())
  });
  pomodoroMenu.addEventListener('click', () => {
    workspace_title.innerText = "Pomodoro";
    workspaceHeader.innerHTML = "";
    if (!mainWorkspace.classList.contains('justify-center')) {
      mainWorkspace.classList.add('justify-center')
    }
    mainWorkspace.innerHTML = '';
    initPomodoro(mainWorkspace)
  });
}

//attach menu and folder events, export to dashboard js
export function attachMenuEvents() {
  const items = initMenuItems();
  eventMenuItems(items);
  folderEvents(editFolderBtn, delFolderBtn);
}
