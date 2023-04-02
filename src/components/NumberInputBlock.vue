<template>
  <div class="input-block"> <!-- class: error -->
    <p class="input-block__name">
      {{ description }}
    </p>
    <input class="input-block__input" type="number" :placeholder="pHolder">
    <p v-if="errorMsg" class="input-block__error-msg">
      {{ errorMsg }}
    </p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    description: {
      type: String,
      required: true
    },
    pHolder: {
      type: String,
      required: true
    },
    errorMsg: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped lang="scss">
.input-block {
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: $smokey-gray;

  font-family: $poppins;
  font-size: .75rem;
  font-weight: bold;

  &__name {
    margin-bottom: .25rem;

    font-weight: bold;
  }
  
  &__error-msg {
    margin-top: 0.5rem;

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
}
</style>