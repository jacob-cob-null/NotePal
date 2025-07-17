import { getTaskSetFS } from "../dashboard/interface/todo-list/firestore-taskSet-todoItem/taskSet-firestore";
import { userStore } from "../login/user";

const user = userStore.getUser(); //init user

//query all docs
export async function initFirestore() {
    getTaskSetFS(user.uid) //task sets
}