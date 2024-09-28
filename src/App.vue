<script>
import AppHeader from "@/components/AppHeader.vue";
import Balance from "@/components/Balance.vue";
import IncomeExpenses from "@/components/IncomeExpenses.vue";
import TransactionList from "@/components/TransactionList.vue";
import AddTransaction from "@/components/AddTransaction.vue";

export default {
  name: "App",

  components: {
    AppHeader,
    Balance,
    IncomeExpenses,
    TransactionList,
    AddTransaction,
  },
};
</script>

<template>
  <AppHeader />
  <div class="container">
    <Balance />
    <IncomeExpenses />
    <TransactionList />
    <AddTransaction />
  </div>
</template>
