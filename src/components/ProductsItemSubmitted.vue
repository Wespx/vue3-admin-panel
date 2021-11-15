<template>
  <li class="card__products-item">
    <p class="card__products-name">{{ product.productName }}</p>

    <div class="card__products-quantity-wrap">
      <span class="card__products-quantity">{{ product.productCount }}</span>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
