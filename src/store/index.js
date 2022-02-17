import { createStore } from "vuex";

export default createStore({
  state: {
    months: [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ],
    weekDay: [
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
      "воскресенье",
    ],
    currentDate: null,
    currency: [],
  },
  mutations: {
    SET_DATE(state, currentDate) {
      state.currentDate = currentDate;
    },
    SET_CURRENCY(state, currency) {
      state.currency = currency;
    },
  },
  actions: {
    getDate({ commit, state }) {
      const date = new Date();
      const currentDate = `${
        state.weekDay[date.getDay() - 1]
      }, ${date.getDate()} ${state.months[date.getMonth()]} ${
        date.getFullYear() < 10 ? "0" : ""
      }${date.getFullYear()}`;
      commit("SET_DATE", currentDate);
    },
    async getCurrency({ commit }) {
      const response = await fetch(
        "https://www.cbr-xml-daily.ru/daily_json.js"
      );
      const { Valute } = await response.json();
      commit("SET_CURRENCY", Valute);
    },
  },
  getters: {
    currentDate(state) {
      return state.currentDate;
    },
    currency(state) {
      return state.currency;
    },
  },
});
