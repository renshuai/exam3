<template>
  <div id="app">
    <div id="nav">
        <router-link to="/">音乐专辑管理</router-link> |
      <router-link to="/spider">“爬取模块”</router-link> |
      <router-link to="/save">存储模块</router-link> |
      <router-link to="/mocha">测试程序</router-link> |
      <router-link to="/api">音乐专辑各rest接口的测试地址</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
