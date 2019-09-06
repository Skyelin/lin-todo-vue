<template>
  <div class="pg-todo-list">
    <div class="todo-list-box">
      <h1>ToDoList</h1>
      <input
        v-model.trim="newTodo"
        class="todo-input"
        placeholder="请输入计划"
        @keyup.enter="addTodoItem"
      >
      <div class="todo-all-check">
        <input 
          v-model="isAllchecked" 
          type="checkbox" 
          @click="allChecked" 
        >
        全部已完成
      </div>
      <ul class="todo-list-ul">
        <todo-item
          v-for="(todoItem,index) in todoList"
          :key="index | getUuid"
          :todo-item="todoItem"
          :index="index"
        />
      </ul>
      <div :class="todoList.length===0?'disnone':'todo-footer'">
        <span class="fl"><b>{{ todoList.length-numDone }}</b>个未完成</span>
        <span 
          class="todo-clear-done" 
          @click="deleteAllItem">删除{{ numDone }}个已完成</span>
      </div>
    </div>
  </div>
</template>
<script>
import todoItem from '../components/todoItem'
import utils from '../service/util'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    todoItem
  },
  filters: {
    getUuid () {
      return utils.getKeys()
    }
  },
  data() {
    return {
      newTodo: ''
    }
  },
  computed: {
    ...mapState({
      todoList: state => state.todos
    }),
    isAllchecked: {
      // 判断是否反选 全选
      get() {
        return this.todoList.findIndex(x => x.done === false) == -1 ? true: false
      },
      set() {}
    },
    numDone: {
      get() {
        // let num = 0
        // for (let index in this.todoList) {
        //   if (this.todoList[index].done === true) {
        //     num++
        //   }
        // }
        let num = this.todoList.filter(x => x.done === true).length
        return num
      }
    }
  },
  methods: {
    ...mapMutations([
      'handleAddTodoItem',
      'handleAllCheck',
      'handleDeleteAll'
    ]),
    addTodoItem() {
      if (this.newTodo) {
        this.handleAddTodoItem(this.newTodo)
        this.newTodo = ''
      }
    },
    allChecked() {
      this.handleAllCheck(!this.isAllchecked)
    },
    deleteAllItem() {
      this.handleDeleteAll()
    }
  }
}
</script>
<style lang="scss">
.pg-todo-list {
  display: flex;
  justify-content: center;
  background: $base-background;
  .todo-list-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 520px;
    background: $base-background;
    border:1px solid $base-box-border-color;
    .todo-input {
      width: 466px;
      font-size: 24px;
      font-family: inherit;
      line-height: 1.4em;
      border: 0;
      outline: none;
      padding: 6px;
      border: 1px solid $base-border-gray;
    }
    .todo-all-check {
      width: 466px;
      position: relative;
      font-size: 14px;
      text-align: left;
    }
    .todo-list-ul {
      margin-left: -40px;
      margin-top: -5px;
      margin-bottom: -5px;
    }
    .todo-footer {
      width:480px;
      display: block;
      color: $page-footer-font-color;
      background: $page-footer-background;
      border-top: 1px solid $base-box-border-color;
      padding: 0 20px;
      line-height: 37px;
      border-radius: 0 0 5px 5px;
      .todo-clear-done {
        float: right;
        line-height: 20px;
        text-decoration: none;
        background: rgba(0, 0, 0, 0.1);
        color: $page-footer-font-color;
        font-size: 11px;
        margin-top: 8px;
        margin-bottom: 8px;
        padding: 0 10px 1px;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 0 0;
        border-radius: 12px;
      }
    }
    .fl {
      float: left;
    }
    .disnone {
      display: none;
    }
  }
}
</style>


