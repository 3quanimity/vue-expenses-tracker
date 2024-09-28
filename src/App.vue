<script setup>
import AppHeader from "@/components/AppHeader.vue";
import Balance from "@/components/Balance.vue";
import IncomeExpenses from "@/components/IncomeExpenses.vue";
import TransactionList from "@/components/TransactionList.vue";
import AddTransaction from "@/components/AddTransaction.vue";
import { ref } from "vue";

const transactions = ref([
  { id: 1, text: "Flower", amount: -19.99 },
  { id: 2, text: "Salary", amount: 299.97 },
  { id: 3, text: "Book", amount: -39.97 },
  { id: 4, text: "Business", amount: 599.97 },
]);
</script>

<template>
  <AppHeader />
  <div class="container">
    <Balance />
    <IncomeExpenses />
    <TransactionList :transactions="transactions" />
    <AddTransaction />
  </div>
</template>
