<template>
  <header>
    <div class="container">
      <div class="nav">
        <div class="menu">
          <router-link class="nav-link" to="/">Список валют</router-link>
          <router-link class="nav-link" to="/converter">Конвертер</router-link>
        </div>
        <div class="date">{{ $store.getters.currentDate }}</div>
      </div>
    </div>
  </header>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: null,
    };
  },
  mounted() {
    this.$store.dispatch("getDate");
    this.interval = setInterval(() => {
      this.$store.dispatch("getDate");
    }, 10000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
};
</script>
