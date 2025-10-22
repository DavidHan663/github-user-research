<template>
    <div>
        <input v-model="username" placeholder="输入用户名"/>
        <button @click="test">测试输入</button>
    </div>
</template>
<script>
export default{
    name:"UserSearch",
    data(){
        return{
            username:'octocat'
        };
    },
    methods:{
        test(){
            alert(`输入用户名为${this.username}`);
        }
    }
};


</script>

<style scoped>
input {
  padding: 8px;
  margin-right: 10px;
}
button {
  padding: 8px 16px;
  background-color: #0066cc;
  color: white;
  border: none;
}
</style>
