<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { TransactionTypes } from "@/enums/transaction.js";

const toast = useToast();

const transaction = ref({
  title: "",
  amount: "",
  type: TransactionTypes.EXPENSE,
});

const emit = defineEmits(["transactionSubmitted"]);

const onSubmit = () => {
  if (!transaction.value.title) {
    toast.error("Transaction title is required");
    return;
  }
  if (!transaction.value.amount) {
    toast.error("Amount is required");
    return;
  }
  if (!parseFloat(transaction.value.amount)) {
    toast.error("Amount must be a number");
    return;
  }
  if (parseFloat(transaction.value.amount) < 0) {
    toast.error("Amount must be a positive number");
    return;
  }

  emit("transactionSubmitted", {
    ...transaction.value,
    amount: parseFloat(
      transaction.value.type === TransactionTypes.INCOME
        ? transaction.value.amount
        : -1 * transaction.value.amount,
    ),
  });

  clearFields();
};

const clearFields = () => {
  transaction.value.title = "";
  transaction.value.amount = "";
};

const setTransactionType = (type) => {
  transaction.value.type = type;
};
</script>

<template>
  <h3>Add new transaction</h3>

  <div class="transaction-type-toggle">
    <button
      :class="[
        'btn',
        'btn--income',
        { active: transaction.type === TransactionTypes.INCOME },
      ]"
      @click="setTransactionType(TransactionTypes.INCOME)"
    >
      income
    </button>
    <button
      :class="[
        'btn',
        'btn--expense',
        { active: transaction.type === TransactionTypes.EXPENSE },
      ]"
      @click="setTransactionType(TransactionTypes.EXPENSE)"
    >
      expense
    </button>
  </div>

  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <input
        type="text"
        id="text"
        v-model="transaction.title"
        placeholder="Transaction title..."
      />
    </div>
    <div class="form-control">
      <input
        type="text"
        id="amount"
        v-model="transaction.amount"
        placeholder="Amount..."
      />
    </div>
    <button class="btn">Add Transaction</button>
  </form>
</template>

<style lang="scss" scoped>
.transaction-type-toggle {
  display: flex;
}

.btn {
  background-color: var(--nord-polar-night-dark);
  color: var(--nord-snow-storm-light);
  margin: 10px 0;

  &--income {
    &:hover,
    &.active {
      background-color: var(--nord-frost-green);
      color: var(--nord-polar-night-darkest);
    }
  }

  &--expense {
    &:hover,
    &.active {
      background-color: var(--nord-aurora-red);
      color: var(--nord-polar-night-darkest);
    }
  }
}

.form-control {
  padding-bottom: 10px;

  &:last-of-type {
    padding-bottom: 0;
  }
}
</style>
