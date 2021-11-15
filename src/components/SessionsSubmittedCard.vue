<template>
  <li class="sessions__item card card-submitted">
    <header class="card__header">
      <div class="card__customer-icon">
        <icon-base width="50" height="50" icon-name="user"
          ><icon-user
        /></icon-base>
      </div>

      <div class="card__customer-data">
        Клиент
        <p class="card__customer-id">
          <span class="card__customer-name">{{ session.sessionId }}</span>
        </p>
        <time class="card__customer-entry-exit-time">{{
          session.entryTime + " - " + session.exitTime
        }}</time>
        <time class="card__customer-date">{{ session.entryDate }}</time>
      </div>

      <div class="card__locked-icon">
        <icon-base
          width="50"
          height="50"
          icon-name="locked"
          icon-color="rgb(11, 27, 100)"
          ><icon-locked
        /></icon-base>
      </div>
    </header>

    <div class="card__enter-time">
      <div class="card__enter-wrap">
        <div class="card__enter-highlight">Вход:</div>
        <time class="card__customer-enter-time">
          {{ session.entryTime }}
        </time>
      </div>
    </div>

    <div class="card__exit-time">
      <div class="card__exit-wrap">
        <div class="card__exit-highlight">Выход:</div>
        <time class="card__customer-exit-time">
          {{ session.exitTime }}
        </time>
      </div>
    </div>

    <ul class="card__products">
      <products-item-submitted
        v-for="product in session.cart"
        :product="product"
        :key="session.cart.indexOf(product)"
      >
      </products-item-submitted>
    </ul>
  </li>
</template>

<script>
import ProductsItemSubmitted from "./ProductsItemSubmitted.vue";

import IconBase from "./IconBase.vue";
import IconUser from "./icons/IconUser.vue";
import IconLocked from "./icons/IconLocked.vue";

export default {
  components: {
    ProductsItemSubmitted,
    IconBase,
    IconUser,
    IconLocked,
  },
  props: {
    session: {
      type: Object,
      required: true,
    },
  },
};
</script>
