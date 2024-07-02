<script setup lang="ts">
import SellerProfile from '@/components/SellerProfile.vue';
import WaitingOrders from '@/components/order/WaitingOrders.vue';

</script>
<template>
  <main>
    <div class="container_home">
      <h1>Welcome!</h1>
    </div>

    <WaitingOrders />
    <SellerProfile />
  </main>
</template>

<style stup>
.container_home {
  color: white;
  margin: 10px
}
</style>
