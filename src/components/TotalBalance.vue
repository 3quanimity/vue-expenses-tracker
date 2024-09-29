<script setup>
import { defineProps } from "vue";
import { utils } from "@/utils/utils.js";

const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
});
</script>

<template class="total-balance">
  <h4 class="total-balance__title">Balance</h4>
  <h1
    id="balance"
    :class="[
      'total-balance__amount',
      total < 0
        ? 'total-balance__amount--minus'
        : 'total-balance__amount--plus',
    ]"
  >
    {{ utils.formatAmountWithCurrency(props.total) }}
  </h1>
</template>

<style lang="scss" scoped>
.total-balance {
  &__amount {
    &--plus {
      color: var(--nord-aurora-green);
    }

    &--minus {
      color: var(--nord-aurora-red);
    }
  }
}
</style>
