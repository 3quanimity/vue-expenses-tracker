<script setup>
import { defineProps } from "vue";

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const formatAmount = (value) => {
  return value >= 0 ? "$" + value : "-$" + Math.abs(value);
};
</script>

<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      v-for="{ id, text, amount } in props.transactions"
      :class="amount < 0 ? 'minus' : 'plus'"
      :key="id"
    >
      {{ text }}
      <span>{{ formatAmount(amount) }}</span>
      <button class="delete-btn">x</button>
    </li>
  </ul>
</template>

<style scoped></style>
