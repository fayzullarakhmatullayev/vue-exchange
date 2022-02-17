<template>
  <section>
    <div class="list-top">
      <h1 class="title">Конвертер</h1>
    </div>
    <div class="converter">
      <div class="card card-one">
        <div class="card-top">{{ currency_one_name }}</div>
        <div class="card-body">
          <select
            class="card-select card-select_one"
            @change="getCurrencyInfo($event.target.value)"
          >
            <option
              :selected="cur.CharCode === 'USD'"
              v-for="cur in currency"
              :key="cur"
              :value="cur.CharCode"
            >
              {{ cur.CharCode }}
            </option>
          </select>
          <input
            type="number"
            class="card-input card-input_one"
            :value="currency_one_input"
            @input="getValue($event.target.value)"
          />
        </div>
      </div>
      <button class="swap-btn" @click="swap">
        <svg
          class="swap-array swap-array__left"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g data-name="Layer 2" id="Layer_2">
            <path
              d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"
            />
          </g>
        </svg>
        <svg
          class="swap-array swap-array__right"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g data-name="Layer 2" id="Layer_2">
            <path
              d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"
            />
          </g>
        </svg>
      </button>
      <div class="card card-two">
        <div class="card-top">{{ currency_two_name }}</div>
        <div class="card-body">
          <select
            class="card-select card-select_second"
            @change="getCurrencyInfo($event.target.value)"
          >
            <option
              :selected="cur.CharCode === 'EUR'"
              v-for="cur in currency"
              :key="cur"
              :value="cur.CharCode"
            >
              {{ cur.CharCode }}
            </option>
          </select>
          <div class="card-input card-input_two"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Converter",
  data() {
    return {
      currency_info: [],
      currency_one_name: "",
      currency_two_name: "",
      currency_one_input: 1,
      currency_two_input: "",
      second_input: "",
    };
  },
  computed: {
    ...mapGetters(["currency"]),
  },
  methods: {
    getCurrencyInfo(value) {
      this.currency_info = this.currency[value];
      this.getData();
    },
    getData() {
      const firstValue = document.querySelector(".card-select_one").value;
      const secondValue = document.querySelector(".card-select_second").value;
      const secondInput = document.querySelector(".card-input_two");
      this.currency_one_name = this.currency[firstValue].Name;
      this.currency_two_name = this.currency[secondValue].Name;
      this.currency_one_input = this.currency[firstValue].Nominal;
      this.currency_two_input = (
        (this.currency[firstValue].Value / this.currency[secondValue].Value) *
        this.currency[secondValue].Nominal
      ).toFixed(2);
      secondInput.textContent = this.currency_two_input;
    },
    getValue(value) {
      let secondInput = document.querySelector(".card-input_two");
      const firstSelect = document.querySelector(".card-select_one").value;
      secondInput.textContent = (
        (+this.currency_two_input * +value) /
        this.currency[firstSelect].Nominal
      ).toFixed(2);
    },
    swap() {
      const firstSelect = document.querySelector(".card-select_one");
      const secondSelect = document.querySelector(".card-select_second");
      let temp = secondSelect.selectedIndex;
      secondSelect.selectedIndex = firstSelect.selectedIndex;
      firstSelect.selectedIndex = temp;

      let temp_name = this.currency_two_name;
      this.currency_two_name = this.currency_one_name;
      this.currency_two_name = temp_name;

      this.getData();
    },
  },
  async mounted() {
    await this.$store.dispatch("getCurrency");
    this.getData();
  },
};
</script>
