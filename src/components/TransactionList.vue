<script>
export default {
  data() {
    return {
      transactions: [
        { id: 1, text: "Flower", amount: -19.99 },
        { id: 2, text: "Salary", amount: 299.97 },
        { id: 3, text: "Book", amount: -39.97 },
        { id: 4, text: "Business", amount: 599.97 },
      ],
    };
  },

  methods: {
    formatAmount(value) {
      if (value >= 0) {
        return "$" + value;
      } else {
        return "-$" + Math.abs(value);
      }
    },
  },
};
</script>

<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      v-for="{ id, text, amount } in transactions"
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
