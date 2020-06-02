<template>
  <div id="app">
    <leftNav />
    <router-view/>
  </div>
</template>

<script type="text/javascript">
  import leftNav from './components/leftNav.vue'
  export default{
    components:{
      leftNav
    }
  }

</script>

<style>
#app {
  margin-top: 0px;
  height: 100%;
} /*
.nav-item .nav-link-active{ 
  color:black!important;
  
} 
a.nav-link:active {
  color:red!important;
} */
</style>
