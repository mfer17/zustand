import { DragEvent, useState } from 'react';
import { useTaskStore } from '../stores';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { TaskStatus } from '../interfaces';

interface Options {
    status: TaskStatus
}

export const useTasks = ({ status }: Options) => {
    const isDragging = useTaskStore( state => !!state.draggingTaskId);
    const onTaskDrop = useTaskStore( state => state.onTaskDrop);
    const addTask = useTaskStore( state => state.addTask );
      
    const [onDragOver, setOnDragOver] = useState(false);

    const handleAddTask = async () => {
        const { isConfirmed, value } = await Swal.fire({
          title: 'Nueva Tarea',
          input: 'text',
          inputLabel: 'Nombre de la tarea',
          inputPlaceholder: 'Ingrese el nombre de la tarea',
          showCancelButton: true,
          showConfirmButton: true,
          buttonsStyling: true,
          customClass: {
            confirmButton: 'bg-black',
            cancelButton: 'bg-black'
          },
          inputValidator: (value) => {
            if(!value ){
              return 'Debe de ingresar un nombre para la tarea'
            }
          } 
        });
    
        if( !isConfirmed ) return;
        
        addTask(value, status);
        
    }
    
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(true);
    }
    
    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(false);
    }
    
    const handleDragDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(false);
        onTaskDrop(status);
    }

    return {
        //Properties
        isDragging,
        //Methods
        onDragOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDragDrop
    }
}