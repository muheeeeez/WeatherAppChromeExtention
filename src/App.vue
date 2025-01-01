<template>
  <div id="app">
    <h1>Hello, Chrome Extension!</h1>
    <button @click="showAlert">Click Me</button>
    <weather />
  </div>
</template>

<script>
import Weather from './components/Weather.vue';
export default {
  components: { Weather },
  methods: {
    showAlert() {
      alert("Hello");
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  padding: 20px;
  width: 300px;
}
</style>
