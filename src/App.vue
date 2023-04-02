<template>
  <div>
    <InputBlock p-holder="DD" :description="'Data'">Lorem, ipsum.</InputBlock>
    <CalcButton/>
    <DateDisplayBlock>
      <!-- <template #value>
        12
      </template> -->
      <template #description>
        march
      </template>
    </DateDisplayBlock>
  </div>
</template>
  
<script lang="ts">
import InputBlock from './components/NumberInputBlock.vue';
import CalcButton from './components/CalcButton.vue';
import DateDisplayBlock from './components/DateDisplayBlock.vue';

export default {
  components: {
    InputBlock,
    CalcButton,
    DateDisplayBlock,
  },
}
</script>

<style scoped>
</style>
