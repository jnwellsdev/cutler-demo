<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
const gameStore = useGameStore()

const { introCopy, isIntro } = storeToRefs(gameStore)
const { handleView, handleNext } = useGameStore()
</script>
<template lang='pug'>
.intro-screen
    header
        p Do you know
        img.logo(src='img/cut-logo-intro.svg')
    section
        span(v-html='introCopy.copy')
        span.cta(v-html="introCopy.cta")
    footer
        button.primary(@click="handleNext") {{introCopy.button}}
</template>
<style lang='sass' scoped>
.intro-screen
    display: grid
    grid-template-rows: 0.5fr 2fr 1fr
    header, section, footer
        @include flex-center
    header
        .logo
            max-width: 44%
            margin: -0.5% 0 0 7.5%
        p
            margin-top: -2%
    section
        padding: 1rem 4%
</style>