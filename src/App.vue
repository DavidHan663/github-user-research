<template>
  <div id="app">
    <h1>Github 用户搜索</h1>
    <UserSearch/>
  </div>
</template>

<script>
import UserSearch from './components/UserSearch.vue';



export default {
  name: 'App',
  components:{UserSearch}
};
</script>

<style>
h1{
  color:blue;
  text-align:center;
}
p, button {
  text-align: center;
}
button {
  padding: 8px 16px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
