<template>
  <div id="app">
    <img
      alt="Codein logo"
      src="./assets/logo.svg">
    <h1>
      Codein To-do list
    </h1>
    <div class="content">
      <List />
      <Preview />
    </div>
  </div>
</template>

<script>
import List from './components/List'
import Preview from './components/Preview'

export default {
  name: 'App',
  components: {
    List,
    Preview
  }
}
</script>
<style>
#app {
  margin-top: 60px;
}

.content {
  display: flex;
  justify-content: center;
  text-align: left;
}
</style>
