<template>
  <ul class="sessions__list">
    <sessions-submitted-card
      v-for="session in sessionsSubmitted"
      :session="session"
      :key="session.sessionId"
    />
  </ul>
</template>

<script>
import SessionsSubmittedCard from "./SessionsSubmittedCard.vue";

export default {
  components: {
    SessionsSubmittedCard,
  },
  props: {
    sessionsSubmitted: {
      type: Object,
      required: true,
    },
  },
};
</script>
