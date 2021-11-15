<template>
  <div class="sessions">
    <h1>Действия клиентов</h1>
    <sessions :sessions="this.$store.state.sessions" />
  </div>
</template>

<script>
import Sessions from "../components/Sessions.vue";
import { mapActions } from "vuex";
export default {
  components: {
    Sessions,
  },
  methods: {
    ...mapActions({
      getSessions: "getSessions",
    }),
  },
  mounted() {
    this.getSessions();
  },
};
</script>
