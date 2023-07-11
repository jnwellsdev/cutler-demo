
<script setup>
import { useGameStore } from '~/store/game'
const { handleDemo } = useGameStore()
onMounted(() => handleDemo())

</script>

<template>
    <div class="w-full flex flex-col items-center justify-center">
        <Main />
    </div>
</template>
  