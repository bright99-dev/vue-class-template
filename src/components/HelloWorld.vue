<script setup lang="ts">
const params = {
  _page: 1,
  _limit: 20,
};

await PostModel.getList(params);
const list = PostModel.list
</script>

<template>
  <div>
    {{ list }}
  </div>
</template>

<style scoped></style>
