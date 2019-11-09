import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to access localStorage
 */
export class LocalStorageService {
  private taskList: Task[];
  private TASK_STORAGE_KEY: string = 'taskList';
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.getToDoListOnLocalStorage();
  }

  /**
   * @name storeInLocalStorage()
   * Save to the localStorage
   * 
   */
  storeOnLocalStorage(): void {
    this.storage.set(this.TASK_STORAGE_KEY, this.taskList);
  }

  /**
   * @name addNewTaskInLocalStorage
   * Store new task in Local Storage
   * @param task 
   */
  addNewTaskOnLocalStorage(task: Task): void {
    // Add new task to the beginning of the taskList
    this.taskList.unshift(task);
    // Save it to localStorage
    this.storeOnLocalStorage();
  }

  /**
   * @name getToDoListInLocalStorage
   * Access localStorage to get all tasks
   * @returns Task[]
   */
  getToDoListOnLocalStorage(): Task[] {
    this.taskList = this.storage.get(this.TASK_STORAGE_KEY) || [];
    return this.taskList;
  }

  /**
   * @name getTaskList
   * Get all Tasks in localStorage
   * @return Task[]
   */
  getTaskList(): Task[] {
    return this.taskList;
  }

  /**
   * @name updateTaskOnLocalStorage
   * @param task 
   */
  updateTaskOnLocalStorage(task: Task): void {
    const index = this.findTaskIndexInArray(task);
    // Update task in the array
    this.taskList[index] = task;
    // Save new array to localStorage
    this.storeOnLocalStorage();

  }

  /**
   * @name deleteTaskOnLocalStorage
   * Delete task from local storage
   * @param task 
   */
  deleteTaskOnLocalStorage(task: Task): void {
    // Find task index in array
    const index = this.findTaskIndexInArray(task);
    // Remove task from array
    this.taskList.splice(index, 1);
    // Save new array to localStorage
    this.storeOnLocalStorage();
  }
  
  /**
   * @name findTaskIndexInArray
   * Find a task inside the array
   * @param task
   * @returns index
   */
  private findTaskIndexInArray(task: Task): any {
    // Find the item that want to be updated
    const taskToUpdate = this.taskList.find(this.findIndexToUpdate, task.id);
    // Find the task index in the array
    return this.taskList.indexOf(taskToUpdate);
  }

  /**
   * @name findIndexToUpdate
   * Helper function to search the task inside the array
   * @param itemToUpdate 
   */
  private findIndexToUpdate(itemToUpdate): boolean {
    return itemToUpdate.id === this;
  }
}
