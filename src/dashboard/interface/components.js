import '../../style.css';

export function initMenuComponents() {
  const mainWindow = document.getElementById('mainWindow');
  const toggleMenu = document.getElementById('toggleMenu');
  const noteGroup = document.getElementById('noteGroup');
  return {
    mainWindow,
    toggleIcon: toggleMenu,
    noteGroup,
  };
}
