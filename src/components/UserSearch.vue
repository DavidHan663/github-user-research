<template>
    <div>
        <input v-model="username" placeholder="输入用户名"/>
        <button @click="searchUsers">搜素</button>
        <p v-if="loading">加载中...</p>
        <p v-else-if="error">{{ error }}</p>
        <p v-else-if="users.length>0">找到{{ users.length }}个用户</p>
        <p v-else-if="!loading&&!error">无结果</p>
        <ul v-if="users.length>0">
            <li v-for="user in users" :key="user.id">
                <img :src="user.avatar_url" width="50" />
                {{ user.login }}(ID:{{ user.id }})
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    name:'UserSearch',
    data(){
        return{
            username:'',
            users:[],
            loading:false,
            error:null
        };
    },
    methods:{
        async searchUsers(){
            this.loading=true;
            this.error=null;
            try{
                const response=await axios.get(
                    `https://api.github.com/search/users?q=${this.username}+in:login`
                );
                this.users=response.data.items;
            }catch(err){
                this.error='搜索失败，稍后重试';
            }finally{
                this.loading=false;
            }
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
img {
  vertical-align: middle;
  margin-right: 10px;
}
</style>
