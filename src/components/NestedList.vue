<template>
  <draggable
    tag="ul"
    :items="items"
    :group="{ name: 'g1' }"
    class="dragArea"
  >
    <li
      v-for="item in items"
      :key="item.id"
      ref="items"
      class="box"
      @click="setEditable"
    >
      <p
        class="title"
        :class="item.selected ? 'selected' : null"
        @click="select(item)"
        @keydown.enter.prevent=""
        @keyup.enter="saveInput($event, item)"
      >
        {{ item.name }}
      </p>
      <nested-list :items="item.items" />
    </li>
  </draggable>
</template>

<script>
import draggable from "vuedraggable"

export default {
  name: 'NestedList',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  components: {
    draggable
  },
  methods: {
    setEditable(e) {
      const item = e.target
      if (item && item.tagName === 'P') {
        item.contentEditable = true
      }
      setTimeout(() => {
        if (document.activeElement !== item) {
          item.contentEditable = false
        }
      }, 300)
    },
    saveInput(e, renamedItem) {
      const item = e.target
      if (item && item.tagName === 'P') {
        item.contentEditable = false
      }
      if (!item.innerText) {
        item.innerText = renamedItem.name
      } else if (item.innerText !== renamedItem.name) {
        this.$store.dispatch('renameItem', {
          uuid: renamedItem.id,
          name: item.innerText
        })
      }
    },
    select(selectedItem) {
      this.$store.dispatch('selectItem', selectedItem.id)
    }
  }
}
</script>

<style>
.dragArea {
  min-height: 50px;
}

.dragArea:first-child {
  margin-right: 1em;
}

.title {
  background: #ffffff;
  border-radius: 1em;
  color: #000233;
  margin: 0;
  text-align: center;
  height: 25px;
  line-height: 25px;
  padding: 0 .5em;
}

.box {
  border: 1px solid rgba(0,2,51,.125);
  box-shadow:0 0 25px rgba(0,0,0,.10196078431372549);
  /* background: #ffffff; */
  min-width: 100px;
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
  /* height: 25px; */
  /* border-radius: 1em; */
  /* color: #000233; */
  /* margin: 1em; */
  margin: 1em 0 1em 1em;
  white-space: nowrap;
  /* padding: 0 .5em; */
  cursor: pointer;
}

.selected {
  font-weight: bold;
}

ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>