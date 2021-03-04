<template>
  <div>
    <div id="list">
      <nested-list :items="itemsLocal" />
    </div>
    <p
      class="task--new"
      @click="addNewTask"
    >
     &plus; Add new task
    </p>
  </div>
</template>
<script>
import NestedList from "./NestedList"
import { mapState } from "vuex"
import { v4 as uuidv4 } from "uuid"

export default {
  name: 'List',
  components: {
    NestedList
  },
  data() {
    return {
      itemsLocal: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.itemsLocal = this.items
    }, 500)
  },
  computed: {
    ...mapState(['items'])
  },
  watch: {
    items(val) {
      this.itemsLocal = val
    }
  },
  methods: {
    addNewTask() {
      let count = this.items.length
      this.$store.dispatch('addItem', {
        id: uuidv4(),
        name: `Task ${count + 1}`,
        details: `This is the task ${count + 1} - ut id urna sollicitudin, ornare mauris eu, blandit arcu. Vestibulum pharetra ligula ut bibendum accumsan`,
        selected: false
      })
    }
  }
}
</script>

<style scoped>
#list {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.task--new {
  cursor: pointer;
  text-align: right;
  padding: 0 1em;
}
</style>
