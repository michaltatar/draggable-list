import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    items: [
      {
        id: uuidv4(),
        name: "Task 1",
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin iaculis dolor at nisl ultricies condimentum. Curabitur eget condimentum enim, a eleifend odio.",
        selected: false
      },
      {
        id: uuidv4(),
        name: "Task 2",
        details: "Ut id urna sollicitudin, ornare mauris eu, blandit arcu. Vestibulum pharetra ligula ut bibendum accumsan",
        selected: false
      },
      {
        id: uuidv4(),
        name: "Task 3",
        details: "Aliquam nulla sapien, posuere in erat sit amet, aliquet ullamcorper diam. Nam imperdiet finibus metus, vel molestie nibh dignissim nec.",
        selected: false
      }
    ]
  },
  mutations: {
    addItem(state, item) {
      state.items.push(item)
    },
    selectItem(state, uuid) {
      const select = i => {
        if (i.children) {
          i.children.map(select)
        }
        i.selected = i.id === uuid
        return i
      }
      state.items = state.items.map(select)
    },
    renameItem(state, {uuid, name}) {
      const select = i => {
        if (i.children) {
          i.children.map(select)
        }
        if (i.id === uuid) {
          i.name = name
        }
        return i
      }
      state.items = state.items.map(select)
    }
  },
  actions: {
    addItem(context, item) {
      context.commit('addItem', item)
    },
    selectItem(context, uuid) {
      context.commit('selectItem', uuid)
    },
    renameItem(context, {uuid, name}) {
      context.commit('renameItem', {uuid, name})
    }
  }
})