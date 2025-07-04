import '../../style.css';

//workspace heading
export const workspace_title = document.getElementById('workspace_title')
//workspace
export const workspace = document.getElementById('workspace');
export const mainWorkspace = document.getElementById('mainWorkspace');
export const workspaceHeader = document.getElementById('workspaceHeader');
//Menu
export const noteGroup = document.getElementById('noteGroup');
//Folder buttons
export const editFolderBtn = document.getElementById('editFolderBtn');
export const delFolderBtn = document.getElementById('delFolderBtn');
export const folderBtns = document.getElementById('folderBtns');

export function initMenuComponents() {
  const mainWindow = document.getElementById('mainWindow');
  const toggleIcon = document.getElementById('toggleIcon');
  const burger = document.getElementById('burger');
  const noteGroup = document.getElementById('noteGroup');
  const menuText = document.getElementsByClassName('menu-text');
  const menu = document.getElementById('menu');
  const line = document.getElementById('line')
  const folderBtns = document.getElementById('folderBtns');
  return {
    mainWindow,
    toggleIcon,
    burger,
    noteGroup,
    menuText,
    menu,
    line,
    folderBtns
  };
}
