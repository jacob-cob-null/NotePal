import {
  workspace_title,
  workspaceHeader,
  delFolderBtn,
  editFolderBtn,
  folderBtns,
  mainWorkspace,
} from "../interface/components";
import { initNotes, displayNotes } from "../interface/notes/notes.render";
import { folderEvents } from "../interface/notes/folder-crud";
import { initTodo } from "../interface/todo-list/todo.render";
import { initCalendar } from "../interface/calendar/calendar-setup";
import { initPomodoro } from "../interface/pomodoro/pomodoro.render";
import { loadEventsFromTodos } from "../interface/calendar/calendar-function";
import { getAllTodoObjects } from "../interface/todo-list/todo-object";

// ✅ Shared collapse logic for both toggle & menu clicks
function collapseSidebar({ mainWindow, noteGroup, menuText, menu, line, folderBtns, signout }) {
  if (window.innerWidth >= 640) {
    mainWindow?.classList.remove("uncollapsed");
    mainWindow?.classList.add("collapsed");
    // Hide inner content for desktop
    signout?.classList.add("invisible");
    noteGroup?.classList.add("invisible");
    menu?.classList.add("invisible");
    folderBtns?.classList.add("invisible");
    line?.classList.add("invisible");
    Array.from(menuText ?? []).forEach((el) => el.classList.add("invisible"));
  } else {
    mainWindow?.classList.remove("uncollapsed-m");
    mainWindow?.classList.add("collapsed-m");
    // On mobile, do not hide menu/menuText so menu text is visible when sidebar is open
    signout?.classList.add("invisible");
    noteGroup?.classList.add("invisible");
    folderBtns?.classList.add("invisible");
    line?.classList.add("invisible");
    // menu and menuText remain visible
  }
}
// ✅ Setup toggle events (desktop & mobile)
function setupToggleMenu({ toggleIcon, mainWindow, noteGroup, menuText, menu, line, folderBtns, burger, signout }) {
  if (window.innerWidth < 640) {
    mainWindow?.classList.remove("collapsed", "uncollapsed");
    mainWindow?.classList.add("collapsed-m"); // default mobile
  }

  // Desktop toggle
  toggleIcon?.addEventListener("click", () => {
    if (window.innerWidth >= 640) {
      const isCollapsed = mainWindow?.classList.contains("collapsed");
      mainWindow?.classList.toggle("collapsed");
      mainWindow?.classList.toggle("uncollapsed");
      // Reverse arrow: add rotate-180 when uncollapsed, remove when collapsed
      if (mainWindow?.classList.contains("collapsed")) {
        toggleIcon?.classList.remove("rotate-180");
      } else {
        toggleIcon?.classList.add("rotate-180");
      }
    }

    signout?.classList.toggle("invisible");
    noteGroup?.classList.toggle("invisible");
    menu?.classList.toggle("invisible");
    folderBtns?.classList.toggle("invisible");
    Array.from(menuText ?? []).forEach((el) => el.classList.toggle("invisible"));
    line?.classList.toggle("invisible");
  });

  // Mobile toggle
  burger?.addEventListener("click", () => {
    if (window.innerWidth < 640) {
      if (mainWindow?.classList.contains("collapsed-m")) {
        mainWindow?.classList.remove("collapsed-m");
        mainWindow?.classList.add("uncollapsed-m");
        // Show sidebar elements on open
        noteGroup?.classList.remove("invisible");
        folderBtns?.classList.remove("invisible");
        line?.classList.remove("invisible");
      } else {
        mainWindow?.classList.remove("uncollapsed-m");
        mainWindow?.classList.add("collapsed-m");
        // Hide sidebar elements on close
        noteGroup?.classList.add("invisible");
        folderBtns?.classList.add("invisible");
        line?.classList.add("invisible");
      }
    }
  });
}

// ✅ Exposed to dashboard.js
export function initEvents({ mainWindow, toggleIcon, noteGroup, burger, menuText, menu, line, folderBtns, signout }) {
  setupToggleMenu({
    toggleIcon,
    mainWindow,
    noteGroup,
    menuText,
    menu,
    burger,
    line,
    folderBtns,
    signout,
  });
}

// ✅ Menu item references
function initMenuItems() {
  const tasksMenu = document.getElementById("tasks");
  const notesMenu = document.getElementById("notes");
  const calendarMenu = document.getElementById("calendar");
  const pomodoroMenu = document.getElementById("pomodoro");

  return {
    tasksMenu,
    notesMenu,
    calendarMenu,
    pomodoroMenu,
  };
}

// ✅ Attach click handlers to menu items
function eventMenuItems(menuItems, sidebarElements) {
  const { mainWindow, noteGroup, menuText, menu, line, folderBtns, signout } = sidebarElements;

  const menuActions = {
    tasks: () => {
      workspace_title.innerText = "Tasks";
      workspaceHeader.innerHTML = "";
      mainWorkspace.classList.remove("justify-center");
      mainWorkspace.innerHTML = "";
      initTodo();
    },
    notes: () => {
      workspace_title.innerText = "Notes";
      mainWorkspace.classList.remove("justify-center");
      mainWorkspace.innerHTML = "";
      initNotes();
      displayNotes();
    },
    calendar: () => {
      workspace_title.innerText = "Calendar";
      workspaceHeader.innerHTML = "";
      mainWorkspace.classList.remove("justify-center");
      mainWorkspace.innerHTML = "";
      initCalendar(mainWorkspace);
      loadEventsFromTodos(getAllTodoObjects());
    },
    pomodoro: () => {
      workspace_title.innerText = "Pomodoro";
      workspaceHeader.innerHTML = "";
      mainWorkspace.classList.add("justify-center");
      mainWorkspace.innerHTML = "";
      initPomodoro(mainWorkspace);
    },
  };

  const onClickCollapse = (action) => {
    action();
    collapseSidebar(sidebarElements); // auto-collapse
  };

  menuItems.tasksMenu?.addEventListener("click", () => onClickCollapse(menuActions.tasks));
  menuItems.notesMenu?.addEventListener("click", () => onClickCollapse(menuActions.notes));
  menuItems.calendarMenu?.addEventListener("click", () => onClickCollapse(menuActions.calendar));
  menuItems.pomodoroMenu?.addEventListener("click", () => onClickCollapse(menuActions.pomodoro));
}

// ✅ Attach all menu & folder events
export function attachMenuEvents() {
  const menuItems = initMenuItems();

  const sidebarElements = {
    mainWindow,
    noteGroup: document.getElementById("noteGroup"),
    menuText: document.querySelectorAll(".menu-text"),
    menu: document.getElementById("menu"),
    line: document.querySelector("hr"), // adjust selector if needed
    folderBtns,
    signout: document.getElementById("signOut"),
  };

  eventMenuItems(menuItems, sidebarElements);
  folderEvents(editFolderBtn, delFolderBtn);
}
