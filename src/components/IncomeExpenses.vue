<script setup>
import { defineProps } from "vue";
import { utils } from "@/utils/utils.js";

const props = defineProps({
  income: {
    type: Number,
    default: 0,
  },
  expenses: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="inc-exp-container">
    <div>
      <h4>Income</h4>
      <div id="money-plus" class="money plus">
        {{ utils.formatAmountWithCurrency(props.income) }}
      </div>
    </div>
    <div>
      <h4>Expenses</h4>
      <div id="money-minus" class="money minus">
        {{ utils.formatAmountWithCurrency(props.expenses) }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
