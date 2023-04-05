<template>
  <div class="input-block"> <!-- class: error -->
    <p class="input-block__name">
      {{ dateShortToString }}
    </p>
    <input
      class="input-block__input" type="number" 
      v-model="inputData"
      :placeholder="inputType">
    <p class="input-block__error-msg">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia';
import { useDateStore } from '@/modules/store/AgeDateStore';

import DateNamesEnum from '@/modules/DateNamesEnum';

export default {
  props: {
    inputType: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      inputData: '',
    }
  },
  computed: {
    ...mapStores(useDateStore),
    dateShortToString(): string {
      let name = '';
      switch (this.inputType) {
        case DateNamesEnum.DD:
          name = 'D A Y';
        break;
        case DateNamesEnum.MM:
          name = 'M O N T H';
        break;
        case DateNamesEnum.YYYY:
          name = 'Y E A R';
        break;
      }
      return name;
    },
  },
  watch: {
    inputData(val) {
      if (val === '') {
        val = null;
      }
      switch (this.inputType) {
        case DateNamesEnum.DD:
          this.dateStore.setDays(val);
        break;
        case DateNamesEnum.MM:
          this.dateStore.setMonths(val);
        break;
        case DateNamesEnum.YYYY:
          this.dateStore.setYears(val);
        break;
      }
    },
  },
}
</script>

<style scoped lang="scss">
.input-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  max-width: 5.5rem;

  color: $smokey-gray;

  font-family: $poppins;
  font-size: .75rem;
  font-weight: bold;

  &__name {
    margin-bottom: .25rem;

    font-weight: bold;
  }
  
  &__error-msg {
    position: absolute;
    top: 5rem;
    left: 0rem;

    font-size: .35rem;
    font-weight: normal;
    font-style: italic;
  }
  
  &__input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

    padding: .75rem 1rem;
    
    border: .0625rem solid $light-gray;
    border-radius: .5rem;
    outline: none;
    
    font-family: $poppins;
    font-size: 1.25rem;
    font-weight: bold;
    
    transition: 0.3s;

    &:focus, &:hover {
      border-color: $purple;
      caret-color: $purple;
    }
  }
  
  
  &.error & {
    &__name {
      color: $light-red;
    }

    &__input {
      border-color: $light-red;
    }

    &__error-msg {
      color: $light-red;
    }
  }

  @media screen and (min-width: 1440px) {
    max-width: 11rem;
    
    font-size: 1.5rem;

    &__name {
      margin-bottom: 0.5rem;
    }

    &__error-msg {
      top: 8.2rem;

      font-size: .875rem;
    }

    &__input {
      padding: .75rem 1.5rem;
      
      font-size: 2.5rem;
    }
  }
}
</style>