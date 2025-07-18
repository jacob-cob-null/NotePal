import { userStore } from '../../login/user';
import '../../style.css';
import { getAuth, signOut } from "firebase/auth";
import { msgAlert } from '../events/alerts';

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
//signout
export const signout = document.getElementById('signOut')

export function initMenuComponents() {
  const mainWindow = document.getElementById('mainWindow');
  const toggleIcon = document.getElementById('toggleIcon');
  const burger = document.getElementById('burger');
  const noteGroup = document.getElementById('noteGroup');
  const menuText = document.getElementsByClassName('menu-text');
  const menu = document.getElementById('menu');
  const line = document.getElementById('line')
  const folderBtns = document.getElementById('folderBtns');
  const signout = document.getElementById('signOut')

  //signs out user
  signout.onclick = function () {
    const auth = getAuth();
    signOut(auth).then(async () => {
      const user = userStore.clearUser();
      window.location.href = '/src/login/login.html'
      await msgAlert("Signing out")
    }).catch((error) => {
      msgAlert(`Something went REALLY wrong... ${error}`)
    });
  }

  return {
    mainWindow,
    toggleIcon,
    burger,
    noteGroup,
    menuText,
    menu,
    line,
    folderBtns,
    signout
  };
}
