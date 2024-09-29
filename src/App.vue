<script setup>
import axios from "axios";
import AppHeader from "@/components/AppHeader.vue";
import TotalBalance from "@/components/TotalBalance.vue";
import IncomeExpenses from "@/components/IncomeExpenses.vue";
import TransactionList from "@/components/TransactionList.vue";
import AddTransaction from "@/components/AddTransaction.vue";
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { utils } from "@/utils/utils.js";

// vars
const toast = useToast();
let transactions = ref([]);
const DB_URL =
  "https://script.google.com/macros/s/AKfycbyF31SwakIjFCmFzhK5q-8p4tBk1IPN5F1irXDfyeh5O7CSMKBmE9CMgXkcrm1rrdJK7w/exec";

// Life cycles
onMounted(() => {
  getTransactionsListFromLocalStorage();

  if (!transactions.value.length) {
    getTransactionsListFromGoogleSheet(DB_URL);
  }

  saveTransactionsToLocalStorage();
});

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

// Get transactionsList from Google Sheet
const getTransactionsListFromGoogleSheet = (url) => {
  axios.get(url).then((res) => {
    console.log(res.data);
    transactions.value = res.data;
  });
};

// Get transactionList from local storage
const getTransactionsListFromLocalStorage = () => {
  const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions"),
  );

  if (localStorageTransactions?.length) {
    transactions.value = localStorageTransactions;
  }
};

// Add transaction //TODO: persist data to google sheet
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.unshift({
    ...transactionData,
    id: utils.generateUniqueId(),
  });

  saveTransactionsToLocalStorage();
  toast.success(`${transactionData.title} Transaction Added`);
};

// Delete Transaction //TODO: persist data to google sheet
const handleDeleteTransaction = (transactionId) => {
  const deletedTransaction = transactions.value.find(
    (transaction) => transaction.id === transactionId,
  );
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== transactionId,
  );

  saveTransactionsToLocalStorage();
  toast.success(`${deletedTransaction.title} Transaction Deleted`);
};

// Save to localStorage //TODO: persist data to google sheet
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>

<template>
  <AppHeader />
  <div class="container">
    <TotalBalance :total="total" />
    <IncomeExpenses :income="income" :expenses="expenses" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    <TransactionList
      v-if="transactions?.length"
      :transactions="transactions"
      @onDeleteTransaction="handleDeleteTransaction"
    />
  </div>
</template>
