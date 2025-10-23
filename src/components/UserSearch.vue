<template>
  <div class="container">
    <el-input
      v-model="username"
      placeholder="输入 GitHub 用户名"
      clearable
      class="search-input"
    />
    <el-button type="primary" @click="searchUsers">搜索</el-button>
    <el-alert v-if="loading" title="加载中..." type="info" :closable="false" />
    <el-alert v-else-if="error" :title="error" type="error" :closable="false" />
    <el-alert
      v-else-if="users.length > 0"
      :title="`找到 ${users.length} 个用户`"
      type="success"
      :closable="false"
    />
    <el-alert
      v-else-if="!loading && !error"
      title="无结果"
      type="warning"
      :closable="false"
    />
    <el-row v-if="users.length > 0" :gutter="20">
      <el-col
        :span="8"
        v-for="user in users"
        :key="user.id"
        class="user-card"
      >
        <el-card shadow="hover">
          <img :src="user.avatar_url" width="50" />
          <span>{{ user.login }}</span>
          <el-button
            type="warning"
            size="small"
            @click="toggleBookmark(user)"
          >
            <el-icon><StarFilled /></el-icon>
            {{ isBookmarked(user) ? '移除书签' : '添加书签' }}
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <h3 v-if="bookmarks.length > 0">我的书签</h3>
    <el-row v-if="bookmarks.length > 0" :gutter="20">
      <el-col
        :span="8"
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        class="user-card"
      >
        <el-card shadow="hover">
          <img :src="bookmark.avatar_url" width="50" />
          <span>{{ bookmark.login }}</span>
          <el-button
            type="danger"
            size="small"
            @click="removeBookmark(bookmark)"
          >
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
import { StarFilled, Delete } from '@element-plus/icons-vue';
export default {
  name: 'UserSearch',
  components: { StarFilled, Delete },
  data() {
    return {
      username: '',
      users: [],
      loading: false,
      error: null,
      bookmarks: JSON.parse(localStorage.getItem('bookmarks')) || []
    };
  },
  methods: {
    async searchUsers() {
      this.loading = true;
      this.error = null;
      this.users = [];
      try {
        const response = await axios.get(
          `https://api.github.com/search/users?q=${this.username}`
        );
        this.users = response.data.items;
      } catch (err) {
        this.error = '搜索失败，请稍后重试';
      } finally {
        this.loading = false;
      }
    },
    toggleBookmark(user) {
      const index = this.bookmarks.findIndex(b => b.id === user.id);
      if (index === -1) {
        this.bookmarks.push({ id: user.id, login: user.login, avatar_url: user.avatar_url });
      } else {
        this.bookmarks.splice(index, 1);
      }
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    },
    isBookmarked(user) {
      return this.bookmarks.some(b => b.id === user.id);
    },
    removeBookmark(bookmark) {
      this.bookmarks = this.bookmarks.filter(b => b.id !== bookmark.id);
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    }
  }
};
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.search-input {
  width: 300px;
  margin-right: 10px;
}
.user-card {
  margin-bottom: 20px;
}
img {
  vertical-align: middle;
  margin-right: 10px;
}
h3 {
  margin-top: 20px;
}
</style>