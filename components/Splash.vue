<script setup>
import { useGameStore } from '~/store/game'
const { handleView, handleNext } = useGameStore()
</script>
<template lang='pug'>
.splash-screen
    section.top
    section.top2
    section.mid
        p Do you know
        img.logo(src='/img/cut-logo-intro.svg')
        button(@click='handleNext') take the quiz
    section.btm2
    section.btm
</template>
<style lang='sass' scoped>
.splash-screen
    @include flex-center-absolute
    flex-flow: column
    section
        display: flex
        flex-flow: column
        justify-content: center
        align-items: center
        &:nth-child(1)
            background: url('img/cut-splash-1.jpg')
            background-size: cover
            background-position: 50% 40%
        &:nth-child(2)
            background: url('img/cut-splash-4.jpg')
            background-size: cover
            background-position: 50% 38%
        &:nth-child(4)
            background: url('img/cut-splash-2.jpg')
            background-size: cover
            background-position: 50% 42%
        &:nth-child(5)
            background: url('img/cut-splash-3.jpg')
            background-size: cover
            background-position: 50% 46%
        &.mid
            justify-content: space-evenly
            .logo
                max-width: 44%
                margin: -2.5% 0 0 1.25%
            p
                margin-top: -2%
            button
                width: 175px
                height: 40px
                border-radius: 20px 0
</style>