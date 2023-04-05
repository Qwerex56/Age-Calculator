<template>
  <div class="date-display">
    <h1 class="date-display__value">
      <slot name="value">--</slot>
    </h1>
    <h1 class="date-display__description">
      <slot name="description"></slot>
    </h1>
  </div>
</template>

<script lang="ts">
export default {
  
}
</script>

<style scoped lang="scss">
.date-display {
  display: flex;

  font-family: $poppins;
  font-size: 1.75rem;
  font-style: italic;
  font-weight: 800;
  line-height: 1.1;

  &__value {
    color: $purple;
  }

  &__description {
    text-indent: 0.5rem;
    color: $off-black;
  }

  @media screen and (min-width: 1440px) {
    font-size: 3.5rem;
  }
}
</style>

