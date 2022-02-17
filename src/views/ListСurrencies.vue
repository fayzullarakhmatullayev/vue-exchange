<template>
  <section>
    <div class="list-top">
      <h1 class="title">Список валют</h1>
      <input
        type="text"
        placeholder="Поиск по названию"
        class="search"
        v-model.trim="search"
      />
    </div>
    <div class="wrapper">
      <div
        v-for="cur in filteredCurrency"
        :key="cur.ID"
        :class="`card card_${cur.ID}`"
      >
        <div class="card-top">{{ cur.Name }}</div>
        <div class="card-body">
          <div class="card-inner">
            <div class="card-cur" :id="`currency_one_${cur.ID}`">
              {{ cur.Nominal }} {{ cur.CharCode }}
            </div>
            <button class="card-flip" @click="swapCurrency(cur)">
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                class="card-array card-array__left"
              >
                <g data-name="Layer 2" id="Layer_2">
                  <path
                    d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"
                  />
                </g>
              </svg>
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                class="card-array card-array__right"
              >
                <g data-name="Layer 2" id="Layer_2">
                  <path
                    d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"
                  />
                </g>
              </svg>
            </button>
            <div class="card-cur" :id="`currency_two_${cur.ID}`">
              {{ cur.Value.toFixed(3) }} RUB
            </div>
          </div>
          <div
            class="card-scale"
            :class="cur.Value > cur.Previous ? 'green' : 'red'"
          >
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <g data-name="Layer 2" id="Layer_2">
                <path
                  d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"
                />
              </g>
            </svg>
            <span>{{
              (cur.Value - cur.Previous).toFixed(3).replace(".", ",")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ListСurrencies",
  data() {
    return {
      search: "",
      interval: null,
    };
  },
  computed: {
    ...mapGetters(["currency"]),
    filteredCurrency() {
      if (this.search !== "") {
        return Object.values(this.currency).filter((cur) =>
          cur.Name.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.currency;
      }
    },
  },
  methods: {
    swapCurrency(cur) {
      const card = document.querySelector(`.card_${cur.ID}`);
      const currencyOne = document.querySelector(`#currency_one_${cur.ID}`);
      const currencyTwo = document.querySelector(`#currency_two_${cur.ID}`);
      card.classList.toggle("switch");
      if (card.classList.contains("switch")) {
        currencyOne.textContent = "1 RUB";
        currencyTwo.textContent = `${(cur.Nominal / cur.Value).toFixed(3)} ${
          cur.CharCode
        }`;
      } else {
        currencyOne.textContent = `${cur.Nominal} ${cur.CharCode}`;
        currencyTwo.textContent = `${cur.Value.toFixed(3)} RUB`;
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("getCurrency");
    this.interval = setInterval(() => {
      this.$store.dispatch("getCurrency");
    }, 10000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
};
</script>
