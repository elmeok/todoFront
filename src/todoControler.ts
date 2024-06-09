import { computed, onMounted, ref } from "vue"
import { todoService } from "./service/todo.service"
import { Todo } from './models/todo';


export const useTodo = () => {
  const client = todoService()
  
  const todos = ref<Todo[]>([])

  onMounted(async () => {
    await fetchTodoList()
  })

  const fetchTodoList = async (): void => (todos.value = await client.getTodoList())
  
  const addNewTodo = async(todo: Todo): Promise<void> => {
    //todos.value.push(todo)
    const response = await client.createTodo(todo);
    console.log("add is done");
    console.log(response);
    fetchTodoList();
    
    
  }
  
  const removeTodo = async (todo: Todo): Promise<void> => {
    console.log(todo);
    //const deletedTodo: Todo[] = todos.value.splice(index, 1)
    await client.deleteTodo(todo);
    fetchTodoList();
  }

  return {
    todos: computed(() => todos.value),
    fetchTodoList,
    addNewTodo,
    removeTodo
  }
}