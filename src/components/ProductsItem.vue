<template>
  <li class="card__products-item">
    <p class="card__products-name">{{ product.productName }}</p>

    <button
      class="card__products-delete"
      @click="$store.commit('removeProduct', { product, sessionId })"
    >
      <icon-base width="20" height="20" icon-name="delete" icon-color="tomato"
        ><icon-delete
      /></icon-base>
    </button>

    <div class="card__products-quantity-wrap">
      <button
        class="card__products-minus"
        @click="
          $store.dispatch('decreaseOrRemoveProduct', { product, sessionId })
        "
      >
        <icon-base width="20" height="20" icon-name="minus"
          ><icon-minus
        /></icon-base>
      </button>
      <span class="card__products-quantity">{{ product.productCount }}</span>
      <button
        class="card__products-plus"
        @click="$store.commit('increaseProduct', { product, sessionId })"
      >
        <icon-base width="20" height="20" icon-name="plus"
          ><icon-plus
        /></icon-base>
      </button>
    </div>
  </li>
</template>

<script>
import IconBase from "../components/IconBase.vue";
import IconDelete from "./icons/IconDelete.vue";
import IconPlus from "./icons/IconPlus.vue";
import IconMinus from "./icons/IconMinus.vue";

import { mapMutations, mapActions } from "vuex";

export default {
  methods: {
    ...mapMutations({
      increaseProduct: "increaseProduct",
      removeProduct: "removeProduct",
    }),
    ...mapActions({
      decreaseOrRemoveProduct: "decreaseOrRemoveProduct",
    }),
  },
  components: {
    IconBase,
    IconDelete,
    IconMinus,
    IconPlus,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
  },
};
</script>
