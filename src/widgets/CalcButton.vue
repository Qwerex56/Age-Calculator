<template>
  <div class="calc-button">
    <img @click="$emit('calcAge')" class="calc-button__arrow" :src="arrow" alt="arr">
  </div>
</template>

<script lang="ts">
import ArrowSVG from '@/assets/images/icon-arrow.svg';

export default {
  emits: ['calcAge'],
  data() {
    return {
      arrow: ArrowSVG,
    }
  },
}

</script>

<style scoped lang="scss">
.calc-button {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  position: relative;

  transition: 0.3s;

  &__arrow {
    width: 4rem;
    padding: 1.25rem;

    border-radius: 50%;

    background-color: $purple;

    transition: 0.2s;

    z-index: 1;

    &:hover {
      background-color: $off-black;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;

    width: 100%;

    border-bottom: .0625rem solid $light-gray;
  }

  @media screen and (min-width: 1440px) {
    justify-content: end;

    &__arrow {
      width: 6rem;

      padding: 1.625rem;
    }
  }
}
</style>