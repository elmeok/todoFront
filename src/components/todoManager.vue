<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { Todo } from '../models/todo';
import todoItem from '../components/todoItem.vue'
import { todoService } from "../service/todo.service"


const todos = ref<Todo[]>([])
const client = todoService()

onMounted(async () => {
  await fetchTodoList();
})


const fetchTodoList = async (): Promise<void> => {
    const response = await (client.getTodoList());
    todos.value = response.data;
  }

// const input_content = ref('')
const input_category = ref(null)

const draftTodo = ref<Todo>({
  title: "",
  description: "",
})


watch(todos, (newVal) => {
  console.log("edit to do");
  console.log(todos)
	//localStorage.setItem('todos', JSON.stringify(newVal))
}, {
	deep: true
})

const addTodo = async () => {
  console.log("add to do")
	if (draftTodo.value.title.trim() === '' || draftTodo.value.title.trim() === '') {
		return
	}
    try{
         await client.createTodo(draftTodo.value);
    }catch(e:any){
        console.log(e.response.data.message);
    }

  console.log("save to do");
  fetchTodoList();

}

const removeTodo = async (todo: Todo): Promise<void> => {
    await client.deleteTodo(todo);
    fetchTodoList();
  }

</script>

<template>
	<main class="app">
		<section class="create-todo">
			<h3>Crée une Tâche</h3>

			<form id="new-todo-form" @submit.prevent="addTodo">
				<h4>Titre de votre tâche?</h4>
				<input 
					type="text" 
					name="content" 
					id="content" 
					placeholder="Faire ..."
					v-model="draftTodo.title" />
				
                <input 
					type="text" 
					name="content" 
					id="content" 
					placeholder="Description..."
					v-model="draftTodo.description" />

				<input type="submit" value="Add todo" />
			</form>
		</section>

		<section class="todo-list">
			<h3>Votre Liste</h3>
			<div class="list" id="todo-list">

				<div v-for="todo in todos" :class="`todo-item ${todo.done && 'done'}`">
					<todoItem :todo = todo :removeTodo = removeTodo></todoItem>
          <!-- <div class="todo-content">
						<input type="text" v-model="todo.description" />
					</div> -->
				</div>

			</div>
		</section>

	</main>
</template>

<style>
:root {
	--primary: #EA40A4;
	--business: #3A82EE;
	--personal: var(--primary);
	--light: #EEE;
	--grey: #888;
	--dark: #313154;
	--danger: #ff5b57;

	--shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

	--business-glow: 0px 0px 4px rgba(58, 130, 238, 0.75);
	--personal-glow: 0px 0px 4px rgba(234, 64, 164, 0.75);
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
}

input:not([type="radio"]):not([type="checkbox"]), button {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	cursor: initial;
}

body {
	background: var(--light);
	color: var(--dark);
}

section {
	margin-top: 2rem;
	margin-bottom: 2rem;
	padding-left: 1.5rem;
	padding-right: 1.5em;
}

h3 {
	color: var(--dark);
	font-size: 1rem;
	font-weight: 400;
	margin-bottom: 0.5rem;
}

h4 {
	color: var(--grey);
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}

.greeting .title {
	display: flex;
}

.greeting .title input {
	margin-left: 0.5rem;
	flex: 1 1 0%;
	min-width: 0;
}

.greeting .title,
.greeting .title input {
	color: var(--dark);
	font-size: 1.5rem;
	font-weight: 700;
}

.create-todo input[type="text"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: var(--dark);
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1.5rem;
}

.create-todo .options {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	margin-bottom: 1.5rem;
}

.create-todo .options label {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	cursor: pointer;
}

input[type="radio"],
input[type="checkbox"] {
	display: none;
}

.bubble {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	border: 2px solid var(--business);
	box-shadow: var(--business-glow);
}

.bubble.personal {
	border-color: var(--personal);
	box-shadow: var(--personal-glow);
}

.bubble::after {
	content: "";
	display: block;
	opacity: 0;
	width: 0px;
	height: 0px;
	background-color: var(--business);
	box-shadow: var(--business-glow);
	border-radius: 50%;
	transition: 0.2s ease-in-out;
}

.bubble.personal::after {
	background-color: var(--personal);
	box-shadow: var(--personal-glow);
}

input:checked ~ .bubble::after {
	width: 10px;
	height: 10px;
	opacity: 1;
}

.create-todo .options label div {
	color: var(--dark);
	font-size: 1.125rem;
	margin-top: 1rem;
}

.create-todo input[type="submit"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: #FFF;
	background-color: var(--primary);
	border-radius: 0.5rem;
	box-shadow: var(--personal-glow);
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.create-todo input[type="submit"]:hover {
	opacity: 0.75;
}

.todo-list .list {
	margin: 1rem 0;
} 

.todo-list .todo-item {
	/* display: flex; */
	 align-items: center; 
	background-color: #FFF;
	padding: 1rem;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1rem;
}

.todo-item label {
	/* display: block; */
	margin-right: 1rem;
	cursor: pointer;
}

.todo-item .todo-content {
	/* flex: 1 1 0%; */
}

.todo-item .todo-content input {
	color: var(--dark);
	font-size: 1.125rem;
}

.todo-item .actions {
	/* display: flex; */
	/* align-items: center; */
}

.todo-item .actions button {
	/* display: block; */
	/* padding: 0.5rem; */
	border-radius: 0.25rem;
	color: #FFF;
	cursor: pointer;
	transition: 0.2s ease-in-out;
}

.todo-item .actions button:hover {
	opacity: 0.75;
}

.todo-item .actions .edit {
	margin-right: 0.5rem;
	background-color: var(--primary);
}

.todo-item .actions .delete {
	background-color: var(--danger);
}

.todo-item.done .todo-content input {
	text-decoration: line-through;
	color: var(--grey);
}


.todo-item{
    display: grid;
  grid-template-columns: repeat(12, 1fr);
}

</style>
