import { db } from "./firebaseConfig";
import { collection, getDocs, getDoc, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore"; 
 
const dbref = collection(db, "Tasks");

class Tasks {
    async addTask(newTask) {
        return await addDoc(dbref, newTask);
    }

    async updateTask(id, updatedTask) {
        const task = doc(db, 'Tasks', id);
        return await updateDoc(task, updatedTask);
    }

    async deleteTask(id) {
        const task = doc(db, 'Tasks', id);
        return await deleteDoc(task);
    }

    async getAllTask() {
        return await getDocs(dbref);
    }

    async getOneTask(id) {
        const task = doc(db, 'Tasks', id);
        return await getDoc(task);
    }
}

export default new Tasks();