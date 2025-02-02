<script setup lang="ts">
import "pesaqr";
</script>

<template>
  <div class="container">
    <h1>PesaQR</h1>
    <pesa-qr type="till" tillNumber="123456" amount="100" :width="900" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

h1 {
  font-size: 4rem;
  font-weight: bold;
}
</style>
