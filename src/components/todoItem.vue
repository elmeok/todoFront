<script setup lang="ts">
defineProps(["todo","removeTodo"])
</script>

<template>

    <label>
        <input type="checkbox" v-model="todo.done" />
        <span :class="`bubble ${todo.category == 'business'
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

    <div class="todoDescription">
        <input type="text" v-model="todo.description" />
        
    </div>

</template>

<style>
.todo-item label{
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 1;
}
.todo-item .todo-content{
    grid-column-start: 2;
    grid-column-end: 10;
    grid-row-start: 1;
    grid-row-end: 1;
    width: 100%;
}

.todo-item .todo-content input{
    width: 100%;
}
.todo-item .actions{
    grid-column-start: 10;
    grid-column-end: 13;
    grid-row-start: 1;
    grid-row-end: 1;
    text-align: right;
}

.todo-item .todoDescription{
    grid-column-start: 1;
    grid-column-end: 12;
    grid-row-start: 2;
    grid-row-end: 2;
    text-align: left;

}
.todoDescription input {
    width: 100%;
    border: 1px;
    color: black;
}

</style>