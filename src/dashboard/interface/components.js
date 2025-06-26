import '../../style.css';

//workspace heading
export const workspace_title = document.getElementById('workspace_title')
//workspace
export const workspace = document.getElementById('workspace');
export const mainWorkspace = document.getElementById('mainWorkspace');
export const workspaceHeader = document.getElementById('workspaceHeader');
export const noteGroup = document.getElementById('noteGroup')

export function initMenuComponents() {
  const mainWindow = document.getElementById('mainWindow');
  const toggleIcon = document.getElementById('toggleIcon');
  const noteGroup = document.getElementById('noteGroup');
  const menuText = document.getElementsByClassName('menu-text');
  const menuHead = document.getElementsByClassName('menu');
  const line = document.getElementById('line')
  return {
    mainWindow,
    toggleIcon,
    noteGroup,
    menuText,
    menuHead,
    line
  };
}
