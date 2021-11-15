<template>
  <div class="sessions">
    <h1>Подтвержденные действия клиентов</h1>
    <sessions-submitted
      :sessionsSubmitted="this.$store.state.submittedSessions"
    />
  </div>
</template>

<script>
import SessionsSubmitted from "../components/SessionsSubmitted.vue";

export default {
  components: {
    SessionsSubmitted,
  },
};
</script>
