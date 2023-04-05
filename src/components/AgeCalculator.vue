<template>
  <div class="age-calculator">
    <div class="age-calculator__date-input">
      <NumberInput 
        class="age-calculator__date-input__input"
        :class="{'error': errorMsgs.errDays.length > 0}"
        :input-type="dateNamesEnum.DD">{{ errorMsgs.errDays }}</NumberInput>        
      <NumberInput 
        class="age-calculator__date-input__input"
        :class="{'error': errorMsgs.errMonths.length > 0}"
        :input-type="dateNamesEnum.MM">{{ errorMsgs.errMonths }}</NumberInput>
      <NumberInput 
        class="age-calculator__date-input__input"
        :class="{'error': errorMsgs.errYears.length > 0}"
        :input-type="dateNamesEnum.YYYY">{{ errorMsgs.errYears }}</NumberInput>
    </div>
    <CalcButton class="age-calculator__arrow" @calc-age="() => {
      errorMsgs = resetValidator;
      if (validateInput()) {
        setAge();
      }
      else {
        age = resetAge;
      }
    }"/>
    <div class="age-calculator__age-displayer">
      <DateDisplay v-for="dateSeg in age" :key="dateSeg.id">
        <template #value>
          <ICountUp
            :end-val="dateSeg.value"/>
        </template>
        <template #description>
          {{ dateSeg.msg }}
        </template>
      </DateDisplay>
    </div>
  </div>
</template>

<script lang="ts">
import ICountUp from 'vue-countup-v3';

import NumberInput from '@/widgets/NumberInputBlock.vue';
import CalcButton from '@/widgets/CalcButton.vue';
import DateDisplay from '@/widgets/DateDisplayBlock.vue';

import { mapStores } from 'pinia';
import { useDateStore } from '@/modules/store/AgeDateStore';

import DateNamesEnum from '@/modules/DateNamesEnum';

export default {
  components: {
    NumberInput,
    CalcButton,
    DateDisplay,
    ICountUp,
  },
  data() {
    return {
      age: [
        { value: 0, msg: 'years', id: 0},
        { value: 0, msg: 'months', id: 1},
        { value: 0, msg: 'days', id: 2},
      ],
      errorMsgs: {
        errDays: '' as string,
        errMonths: '' as string,
        errYears: '' as string,
      },
      dateNamesEnum: DateNamesEnum,
    };
  },
  computed: {
    ...mapStores(useDateStore),
    resetValidator() {
      return {
        errDays: '' as string,
        errMonths: '' as string,
        errYears: '' as string,
      };
    },
    resetAge() {
      return [
        { value: 0, msg: 'years', id: 0},
        { value: 0, msg: 'months', id: 1},
        { value: 0, msg: 'days', id: 2},
      ]
    }
  },
  methods: {
    validateInput() {
      if (this.dateStore.days === null) {
        this.errorMsgs.errDays = 'this field is required';
      } else {
        this.errorMsgs.errDays = '';
      }
      if (this.dateStore.months === null) {
        this.errorMsgs.errMonths = 'this field is required';
      } else {
        this.errorMsgs.errMonths = '';
      }
      if (this.dateStore.years === null) {
        this.errorMsgs.errYears = 'this field is required';
        return;
      } else {
        this.errorMsgs.errYears = '';
      }

      if (this.dateStore.getMonths === null){
        return false;
      }

      const months = this.dateStore.getMonths - 1;
      if (!this.isInRange(months, 0, 11)) {
        this.errorMsgs.errMonths = 'Must be a valid date';
        
        this.errorMsgs.errDays = ' ';
        this.errorMsgs.errYears = ' '
        return false;
      } else {
        this.errorMsgs = this.resetValidator;
      }

      if (this.dateStore.getDays === null){
        return false;
      }

      const days = this.dateStore.getDays;
      switch (true) {
        case [0, 2, 4, 6, 7, 9, 11].includes(months):
          if (!this.isInRange(days, 1, 31)) {
            this.errorMsgs.errDays = 'Must be a valid date';
            return false;
          } else {
            this.errorMsgs.errDays = '';
          }
        break;
        case [3, 5, 8, 10].includes(months):
          if (!this.isInRange(days, 1, 30)) {
            this.errorMsgs.errDays = 'Must be a valid date';
            return false;
          } else {
            this.errorMsgs.errDays = '';
          }
        break;
        case [1].includes(months):
          if (!this.isInRange(days, 1, 29)) {
            this.errorMsgs.errDays = 'Must be a valid date';
            return false;
          } else {
            this.errorMsgs.errDays = '';
          }
        break;
      }

      if (this.dateStore.getYears === null){
        return false;
      }

      const year = this.dateStore.getYears - 1;
      if (year > new Date().getFullYear()) {
        this.errorMsgs.errYears = 'Must be in the past';
        return false;
      } else {
        this.errorMsgs.errYears = '';
      }
      return true;
    },
    setAge(): void {
      if (this.dateStore.getYears === null || this.dateStore.getMonths === null || this.dateStore.getDays === null) {
        return;
      }

      const birthDate = new Date(this.dateStore.getYears, this.dateStore.getMonths - 1, this.dateStore.getDays);
      const today = new Date();

      const age = new Date(today - birthDate);
      this.age = [
        { value: age.getFullYear() - 1970, msg: 'years', id: 0},
        { value: age.getMonth(), msg: 'months', id: 1},
        { value: age.getDate(), msg: 'days', id: 2},
      ]
    },
    isInRange(x: number, min: number, max: number): boolean {
      return x >= min && x <= max;
    },
  }
}

</script>

<style scoped lang="scss">
.age-calculator {
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 343px;
  margin: 1rem;
  padding: 3rem 1.5rem;

  background-color: $white;
  border-radius: 1.5rem;
  border-bottom-right-radius: 6.25rem;

  box-shadow: .25rem .25rem 2rem hsla(0, 0%, 8%, 20%);

  &__date-input {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    width: 100%;
  }

  &__arrow {
    margin: 2rem 0;
  }

  @media screen and (min-width: 1440px) {
    width: 840px;

    padding: 3.5rem;

    border-bottom-right-radius: 12.5rem;

    &__date-input {
      justify-content: start;

      &__input {
        margin-right: 2rem;
      }
    }
  }
}
</style>