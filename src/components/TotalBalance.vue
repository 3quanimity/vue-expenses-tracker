<script setup>
import { defineProps } from "vue";
import { utils } from "@/utils/utils.js";

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <h4>Balance</h4>
  <h1 id="balance">{{ utils.formatAmountWithCurrency(props.total) }}</h1>
</template>

<style scoped></style>
