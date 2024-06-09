<template>
  <div class="bank-card">
    <h3 class="title">Вы можете добавить карту для удобства оплаты</h3>
    <form class="form">
      <label>
        <input
          type="text"
          name="cc-number"
          inputmode="numeric"
          pattern="[ 0-9]*"
          maxlength="22"
          autocomplete="cc-number"
          placeholder="Номер карты"
        />
      </label>
      <div class="card-aside">
        <label>
          <input
            type="text"
            pattern="[ 0-9]*"
            maxlength="5"
            inputmode="numeric"
            placeholder="ММ / ГГ"
            :value="cardMonthYear"
            class="width-min"
            @input="setCardMonthYear($event.target.value)"
          />
        </label>
        <label for="">
          <input
            type="text"
            pattern="[ 0-9]*"
            maxlength="3"
            class="width-min"
            inputmode="numeric"
            placeholder="CVV"
          />
        </label>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  let cardMonthYear = ref('')

  const setCardMonthYear = value => {
    let val = value
    if (value.length === 2) {
      val = value + '/'
    }
    cardMonthYear.value = val
  }
</script>

<style lang="scss" scoped>
  input {
    padding: 12px 24px;
    border: none;
    border-bottom: 1px solid #c4c4c4;
    outline: none;
    width: 100%;
  }
  .width-min {
    width: 100px;
  }
  .form {
    display: flex;
    gap: 20px;
    background: #eee;
    padding: 12px;
    border-radius: 12px;
  }
  .card-aside {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .title {
    font-size: 14px;
    margin-bottom: 12px;
    font-weight: 500;
    opacity: 0.7;
  }
</style>
