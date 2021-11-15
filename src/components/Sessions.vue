<template>
  <ul class="sessions__list">
    <sessions-card
      v-for="session in sessions"
      :session="session"
      :key="session.sessionId"
    />
  </ul>
</template>

<script>
import SessionsCard from "./SessionsCard.vue";

export default {
  components: {
    SessionsCard,
  },
  props: {
    sessions: {
      type: Object,
      required: true,
    },
  },
};
</script>
