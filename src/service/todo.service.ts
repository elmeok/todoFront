import {ref} from 'vue'
import axios, { AxiosResponse } from 'axios';
import { Todo } from '../models/todo';

export const todoService = (baseUrl = "http://localhost:3000") => {
    const url = ref<string>(baseUrl);
  
    const getTodoList = async (): Promise<AxiosResponse<Todo[]>> => {
      return await axios.get(`${url.value}/todos`)
    }
  
    const createTodo = async (todo: Todo): Promise<AxiosResponse<Todo>> => {
        return await axios.post(`${url.value}/todos`, todo);
    }

    const updateTodo = async (todo: Todo): Promise<AxiosResponse<Todo>> => {
      return await axios.patch(`${url.value}/todos/${todo._id}`, todo);
  }
  
    const deleteTodo = async (todo: Todo): Promise<AxiosResponse<Todo>> => {
        return await axios.delete(`${url.value}/todos/${todo._id}`, todo);
    }
  
    return {
      getTodoList,
      createTodo,
      deleteTodo,
      updateTodo
    }
  }

  //gerer ici les 404 ect