import { defineStore } from 'pinia';

export const useDateStore = defineStore('date', {
  state: () => {
    return {
      // Place to for stored values
      days: null as number | null,
      months: null as number | null,
      years: null as number | null,
    }
  },

  actions: {
    // Counterpart of methods
    setDays(value: number): void {
      this.days = value;
    },
    setMonths(value: number): void {
      this.months = value;
    },
    setYears(value: number): void {
      this.years = value;
    },
  },

  getters: {
    // Counterpart of getters
    getDays: state => state.days,
    getMonths: state => state.months,
    getYears: state => state.years,
  },
})