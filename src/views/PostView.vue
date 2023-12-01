<template>
  <div>
    {{ list }}
  </div>
</template>

<script setup lang="ts">
const params = {
  _page: 1,
  _limit: 10,
};
// SubscriptionModel.getList(params);
await PostModel.getList(params);
console.log(SubscriptionModel.list)
const list = PostModel.list;
</script>

<style scoped></style>
