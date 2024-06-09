<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { Todo } from './models/todo';
import { useTodo} from "./todoControler"
//import { TodoService } from './service/todo.service';

const { todos, fetchTodoList, addNewTodo, removeTodo } = useTodo()

//const todos = ref<Todo[]>([])

const name = ref('')

// const input_content = ref('')
const input_category = ref(null)

const draftTodo = ref<Todo>({
  id:"",
  title: "",
  description: "",
  status :"",
  createdAt : 0,
})

const todos_asc = computed(() => todos.value.sort((a :Todo,b: Todo) =>{
	return a.createdAt - b.createdAt
}))

watch(todos, (newVal) => {
  console.log("edit to do");
  console.log(todos)
	//localStorage.setItem('todos', JSON.stringify(newVal))
}, {
	deep: true
})

const addTodo = () => {
  console.log("add to do")
	if (draftTodo.value.title.trim() === '' || draftTodo.value.title.trim() === '') {
		return
	}
  addNewTodo(draftTodo.value);
  console.log(draftTodo.value);
  console.log("save to do");
	// todos.value.push({
	// 	title: input_content.value,
	// 	description: input_category.value,
	// 	done: false,
	// 	editable: false,
	// 	createdAt: new Date().getTime()
	// })
}

// const removeTodo = (todo : Todo) => {
// 	todos.value = todos.value.filter((t) => t !== todo)
// }

onMounted(() => {

  // let todo1 :Todo = {id: "6661842eb84da304104af04b", title : "toto", description :"ici", status :"titi", createdAt : 1510151};
  // let todo2 :Todo = {id: "6661842eb84da304104af04c",title : "toto1", description :"ic2i", status :"tit2i", createdAt : 1510152};
  // let todo3 :Todo = {id: "6661842eb84da304104af04d",title : "toto3", description :"ic2i", status :"tit2i", createdAt : 1510152};
  // let todos1: Todo[] = [todo1, todo2,todo3];

  // todos.value =todos1;
})

</script>

<template>
	<main class="app">
		
		<section class="greeting">
			<h2 class="title">
				What's up, <input type="text" id="name" placeholder="Name here" v-model="name">
			</h2>
		</section>

		<section class="create-todo">
			<h3>CREATE A TODO</h3>

			<form id="new-todo-form" @submit.prevent="addTodo">
				<h4>What's on your todo list?</h4>
				<input 
					type="text" 
					name="content" 
					id="content" 
					placeholder="e.g. make a video"
					v-model="draftTodo.title" />
				
				<h4>Pick a category</h4>
				<div class="options">

					<label>
						<input 
							type="radio" 
							name="category" 
							id="category1" 
							value="business"
							v-model="input_category" />
						<span class="bubble business"></span>
						<div>Business</div>
					</label>

					<label>
						<input 
							type="radio" 
							name="category" 
							id="category2" 
							value="personal"
							v-model="input_category" />
						<span class="bubble personal"></span>
						<div>Personal</div>
					</label>

				</div>

				<input type="submit" value="Add todo" />
			</form>
		</section>

		<section class="todo-list">
			<h3>TODO LIST</h3>
			<div class="list" id="todo-list">

				<div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
					<label>
						<input type="checkbox" v-model="todo.done" />
						<span :class="`bubble ${
							todo.category == 'business' 
								? 'business' 
								: 'personal'
						}`"></span>
					</label>

					<div class="todo-content">
						<input type="text" v-model="todo.title" />
					</div>

					<div class="actions">
						<button class="delete" @click="removeTodo(todo)">Delete</button>
					</div>
          <!-- <div class="todo-content">
						<input type="text" v-model="todo.description" />
					</div> -->
				</div>

			</div>
		</section>

	</main>
</template>

