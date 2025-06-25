import '../../style.css';

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
