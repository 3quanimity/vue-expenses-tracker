<script setup>
import { defineProps } from "vue";
import { utils } from "@/utils/utils.js";

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      v-for="{ id, title, amount } in props.transactions"
      :class="amount < 0 ? 'minus' : 'plus'"
      :key="id"
    >
      {{ title }}
      <span>{{ utils.formatAmountWithCurrency(amount) }}</span>
      <button class="delete-btn">x</button>
    </li>
  </ul>
</template>

<style scoped></style>
