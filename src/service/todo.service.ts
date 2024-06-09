import {ref} from 'vue'
import axios from 'axios';

export const todoService = (baseUrl = "http://localhost:3000") => {
    const url = ref<string>(baseUrl);
  
    const getTodoList = async (): Promise<Todo[]> => {
      const response = await axios.get(`${url.value}/todos`)
      return response.data;
    }
  
    const createTodo = async (todo: Todo): void => {
        const response = await axios.post(`${url.value}/todos`, todo);
        return response;
    }
  
    const deleteTodo = async (todo: Todo): void => {
        const response = await axios.delete(`${url.value}/todos/${todo._id}`, todo);
      getTodoList();
    }
  
    return {
      getTodoList,
      createTodo,
      deleteTodo
    }
  }