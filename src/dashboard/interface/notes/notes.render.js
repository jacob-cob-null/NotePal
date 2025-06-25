import '../../../style.css';
import { marked } from 'marked';
import { mainWorkspace, workspace, workspaceHeader } from '../components';


//initialize notes components
export function renderNoteComponents() {
    
    //create button
    let createBtn = document.createElement('button');
    createBtn.textContent = 'New Note';
    createBtn.classList.add('h-10', 'w-26', 'bg-accent', 'rounded-xl', 'text-white','font-head');
    createBtn.setAttribute('id','createBtn');
    workspaceHeader.append(createBtn);

    return createBtn;
}
//render notes
function renderNotes() {


}

//render input for note creation
function createNote() {
    mainWorkspace.innerHTML='';
    const form = document.createElement('form');
    form.classList.add('flex','flex-col','gap-5','items-start')
        
}

//render input for note update

//events

export function noteEvents() {
    createBtn.addEventListener('click', () => {
        createNote();
    })
}