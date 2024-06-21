<template>
  <div class="card_order">
    <div class="row">
      <div class="col-10">
        <h5>Order</h5>
      </div>
      <div class="col-2">
        <p>id</p>
      </div>
    </div>
    <div>
      <hr />
      <div>
        <div class="row">
          <div class="col-3">
            <img src="../../assets/images/burger.jpg" style="width: 50px;" />
          </div>
          <div class="col-9">
            <p>Lasanha</p>
            <p>$ 12.00 x 10 = $120.00</p>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <p>Subtotal</p>
    <p>Delivery fee</p>
    <p>Total</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.card_order {
  background-color: #FFFFFF;
  color: #000000;
  width: 300px;
  border-radius: 1rem;
  padding: 1rem 1rem 0.5rem 1rem;
}
</style>