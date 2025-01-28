import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';
import { immer } from "zustand/middleware/immer";
 

interface TaskState {
    draggingTaskId?: string;
    tasks: Record<string, Task>;
    getTaskByStatus: (status: TaskStatus) => Task[];
    addTask: (title: string, status: TaskStatus)  => void;
    setDraggingTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;
    changeProgress: (taskId: string, status: TaskStatus) => void;
    onTaskDrop: (status: TaskStatus) => void;
}

const storeTaskApi: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/persist", unknown], ["zustand/immer", never]]> = (set, get) => ({
    draggingTaskId: undefined,
    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status:'open'},
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status:'in-progress'},
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status:'open'},
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status:'open'},
    },

    getTaskByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values( tasks ).filter( task => task.status === status);
    }, 

    addTask:  (title: string, status: TaskStatus) => {
        const newTask = { id: uuidv4(), title, status }
        /*
         Forma Nativa de Zustand
         * set( state => ({
            tasks: {
                ...state.tasks,
                [newTask.id]: newTask
            }
        }))*/

        set ( state => {
            state.tasks[newTask.id] = newTask
        })
    },

    setDraggingTaskId: (taskId: string) => {
        set(({ draggingTaskId: taskId}), false, "Inicia el Dragging")
    },

    removeDraggingTaskId: () => {
        set({draggingTaskId: undefined},  false, "Finaliza el Dragging")
    },

    changeProgress: (taskId: string, status: TaskStatus) => {
        set( state => {
            state.tasks[taskId] = {
                ...state.tasks[taskId],
                status
            };
        })
    },

    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if( !taskId ) return;

        get().changeProgress(taskId, status);
        get().removeDraggingTaskId();
    }

})

export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            immer(storeTaskApi)
        , {name: "tasks-store"})
    )

);