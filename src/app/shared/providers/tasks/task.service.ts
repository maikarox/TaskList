import { LocalStorageService } from './../../storage/local-storage.service';
import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { isUndefined, isNull} from 'util';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private todoTasks: Task[] = [];
  private doneTasks: Task[] = [];
  constructor(private localStorageService: LocalStorageService) {
    this.getToDoTaskFromLocalStorage();
    this.getDoneTasksFromLocalStorage();
  }
 
  /**
  * @name getTask
  * Get the task searched by id
  * @param id 
  * @returns Task
  */
  getTask(task: Task): Task {
    if(task.done){
      return this.doneTasks.filter((tsk) => { return tsk.id === task.id})[0];
    }else{
      return this.todoTasks.filter((tsk) => { return tsk.id === task.id})[0];
    }
    
  }

  /**
   * @name getIncompleteTasks
   * Return the all tasks with status incomplete
   * @param
   * @returns Task[]
   */
  getIncompleteTasks(): Task[] {
    return this.todoTasks;
  }

  /**
   * @name getDoneTasks
   * Return all task with status done
   * @param
   * @returns Task[]
   */
  getDoneTasks(): Task[] {
    return this.doneTasks;
  }

  /**
   * @name createTask
   * Create Task 
   * @param newTask 
   */
  createTask(newTask: Task): void {
    // Add new Task to the top of the array
    this.todoTasks.unshift(newTask);
    // Save changes to localStorage
    this.localStorageService.addNewTaskOnLocalStorage(newTask);
  }

  /**
   * @name editTask
   * Edit task if its status is incomplete -> done = false
   * @param updatedTask 
   */
  editTask(updatedTask: Task): void {
    // If the task its incomplete only
    if(!isUndefined(updatedTask) && !isNull(updatedTask) && !updatedTask.done) {
      // Update list
      this.updateTask(updatedTask);
      // Update in localStorage
      this.localStorageService.updateTaskOnLocalStorage(updatedTask);
    }
  }

  /**
   * @name markAsDone
   * Mark task as done
   * @param task 
   */
  markAsDone(task: Task): void {
    // If the task its incomplete only
    if(!isUndefined(task) && !isNull(task)) {  
      // add to done array
      this.doneTasks.unshift(task);
      // Remove from to do array
      this.todoTasks = this.todoTasks.filter(item => { return item.id !== task.id});
      // Mark as done
      task.done = true;
      task.doneDate = new Date();
      // add to done array
      this.doneTasks.unshift(task);
      this.localStorageService.updateTaskOnLocalStorage(task);   
    }
  }

  /**
   * @name deleteTask
   * Delete a task if its state is done -> done = true
   * @param Task
   */
  deleteTask(task: Task): void {
    if(!isUndefined(task) && !isNull(task) && task.done){
      this.doneTasks = this.doneTasks.filter((tsk) => { tsk.id !== task.id});
      this.localStorageService.deleteTaskOnLocalStorage(task);
    }
  }

  /**
   * @name getDoneTasksFromLocalStorage
   * Initialize the doneTask list
   */
  private getDoneTasksFromLocalStorage() {
    this.doneTasks = this.localStorageService.getTaskList().filter((task) =>{
      return task.done === true;
    });
  }

  /**
   * @name getToDoTaskFromLocalStorage
   * Initialize the todoTasks List
   */
  private getToDoTaskFromLocalStorage(): void {
    this.todoTasks = this.localStorageService.getTaskList().filter((task) =>{
      return !task.done;
    });
  }

  /**
   * @name getIndexOfTask
   * Get the task index on its array
   * @param task 
   * @param done 
   */
  private getIndexOfTask(task: Task) : any{
    if(task.done){ // If belongs to the done list
      return this.doneTasks.indexOf(task);
    } else { // If it is an incomplete task
      return this.todoTasks.indexOf(task);
    }
  }

  /**
   * @name updateTask
   * Method to update task on its List
   * @param updatedTask 
   */
  private updateTask(updatedTask: Task): void {
    // Find its index on the corresponding array
    const index = this.getIndexOfTask(updatedTask);
    if(index !== -1) {
      // Update task on array
      this.updateTaskOnItsArray(updatedTask, index);
    } 
  }

  /**
   * @name updateTaskOnItsArray
   * @param task 
   * @param index 
   */
  private updateTaskOnItsArray(task: Task, index: any): void {
    if(!task.done){
      this.todoTasks[index] = task;
    }
  }
}
