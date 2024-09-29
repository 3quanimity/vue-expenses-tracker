<script setup>
import AppHeader from "@/components/AppHeader.vue";
import TotalBalance from "@/components/TotalBalance.vue";
import IncomeExpenses from "@/components/IncomeExpenses.vue";
import TransactionList from "@/components/TransactionList.vue";
import AddTransaction from "@/components/AddTransaction.vue";

import { ref, computed } from "vue";
import { useToast } from "vue-toastification";

import { utils } from "@/utils/utils.js";

const toast = useToast();

let transactions = ref([
  { id: 1, title: "Flower", amount: -19.99 },
  { id: 2, title: "Salary", amount: 299.97 },
  { id: 3, title: "Book", amount: -39.97 },
  { id: 4, title: "Business", amount: 599.97 },
]);

// Get Total Balance
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});

// Get Income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
});

// Get Expenses
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
});

// Add transaction
const handleTransactionSubmitted = (transactionData) => {
  console.log(transactionData);
  transactions.value.unshift({
    ...transactionData,
    id: utils.generateUniqueId(),
  });
  toast.success("Transaction Added Successfully");
};
</script>

<template>
  <AppHeader />
  <div class="container">
    <TotalBalance :total="total" />
    <IncomeExpenses :income="income" :expenses="expenses" />
    <TransactionList v-if="transactions?.length" :transactions="transactions" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>
