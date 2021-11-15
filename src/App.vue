<template>
  <navbar></navbar>
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar,
  },
};
</script>

<style>
@import url(https://necolas.github.io/normalize.css/8.0.1/normalize.css);
@import url("./assets/main.css");

* {
  box-sizing: border-box;
}

#app {
  padding: 20px;
}

h1 {
  text-align: center;
}

button {
  cursor: pointer;
}
</style>
