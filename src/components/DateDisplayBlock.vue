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
  font-size: 3.5rem;
  font-style: italic;
  font-weight: 800;

  &__value {
    margin-right: 0.5rem;

    color: $purple;
  }

  &__description {
    color: $off-black;
  }
}
</style>

