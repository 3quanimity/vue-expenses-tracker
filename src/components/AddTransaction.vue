<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const transaction = ref({
  title: "",
  amount: "",
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
  if (transaction.value.amount && !parseFloat(transaction.value.amount)) {
    toast.error("Amount must be a number");
    return;
  }

  emit("transactionSubmitted", {
    ...transaction.value,
    amount: parseFloat(transaction.value.amount),
  });

  clearFields();
};

const clearFields = () => {
  transaction.value.title = "";
  transaction.value.amount = "";
};
</script>

<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Transaction Title</label>
      <input
        type="text"
        id="text"
        v-model="transaction.title"
        placeholder="Enter text..."
      />
    </div>
    <div class="form-control">
      <label for="amount">Amount</label>
      <input
        type="text"
        id="amount"
        v-model="transaction.amount"
        placeholder="Enter amount..."
      />
    </div>
    <button class="btn">Add Transaction</button>
  </form>
</template>

<style scoped></style>
