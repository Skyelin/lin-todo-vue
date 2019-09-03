<template>
  <li :class="isEditing[index] ? 'todo-item-dis-border':'todo-item'">
    <div 
      v-show="!isEditing[index]" 
      @dblclick="changeToEdit">
      <input 
        v-model="todoItem.done"
        :checked="todoItem.done" 
        type="checkbox"
        @click="itemCheck">
      <label
        :class="{ 'line-through': todoItem.done }"
      >{{ todoItem.text }}</label>
      <img 
        class="close-icon" 
        src="../../static/close-circle.png" 
        @click="deleteClick">
    </div>
    <div v-show="isEditing[index]">
      <input 
        ref="editInput" 
        v-model="editText" 
        class="edit-input" 
        @blur="changeText" 
        @keyup.enter="changeText">
    </div>
  </li>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    todoItem: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isEditing: [],
      editText: ''
    }
  },
  // watch: {
  //   'isEditing'(val) {
  //     if(!val) {
  //       this.$refs.editInput.focus()
  //     }
  //   }
  // },
  mounted() {
    this.initEditing
    this.editText = this.todoItem.text
  },
  methods: {
    ...mapMutations([
      'handleDeleteTodo',
      'handleToggleTodo',
      'handleEditText'
    ]),
    itemCheck() {
      this.handleToggleTodo(this.index)
    },
    deleteClick() {
      this.handleDeleteTodo(this.index)
    },
    initEditing() {
      this.isEditing[this.index] = false
    },
    changeToEdit() {
      this.$set(this.isEditing, this.index, true)
      if(this.isEditing[this.index]) {
        this.$nextTick(() => {
          this.$refs.editInput.focus()
        })
      }
    },
    changeText() {
      this.handleEditText({ index: this.index, text: this.editText })
      this.$set(this.isEditing, this.index, false)
    }
  }
}
</script>
<style lang="scss">
.todo-item {
  width: 444px;
  padding: 18px 20px 18px 0;
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #cccccc;
  list-style: none;
  text-align: left;
}
.todo-item:last-child {
  border-bottom: none;
}
.todo-item-dis-border {
  border-bottom: none;
  padding: 8px 20px 8px 0;
  width: 444px;
  position: relative;
  font-size: 24px;
  list-style: none;
  text-align: left;
}
.close-icon {
  position:absolute;
  top:25px;
  right:20px;
  display: none;
  cursor: pointer;
  width:20px;
  height:20px;
  background-image: url(/static/close-circle.png) 
}
.todo-item:hover .close-icon{
  display: block;
}
.line-through{
  color: #777777;
  text-decoration: line-through;
}
.dis-none {
  display:none;
}
.edit-input {
  display: block;
  width:444px;
  height:50px;
  font-size: 24px;
}

</style>
