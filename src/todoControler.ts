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
  
  const addNewTodo = (todo: Todo): void => {
    //todos.value.push(todo)
    client.createTodo(todo)
  }
  
  const removeTodo = (todo: Todo): void => {
    console.log(todo);
    //const deletedTodo: Todo[] = todos.value.splice(index, 1)
    client.deleteTodo(todo);
  }

  return {
    todos: computed(() => todos.value),
    fetchTodoList,
    addNewTodo,
    removeTodo
  }
}