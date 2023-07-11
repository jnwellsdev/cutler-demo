<script setup>
import { useGameStore } from '~/store/game'
const { handleView, handleNext } = useGameStore()
</script>
<template lang='pug'>
.splash-screen
    section.top
    section.top2
    section.top3
    section.top4
    section.mid
        p Do you know
        img.logo(src='/img/cut-logo-intro.svg')
        button(@click='handleNext') take the quiz
    section.btm
    section.btm2
    section.btm3
    section.btm4
</template>
<style lang='sass' scoped>
.splash-screen
    @include flex-center-absolute
    flex-flow: row wrap
    section
        display: flex
        justify-content: center
        align-items: center
        width: 50%
        height: 20%
        &:nth-child(1)
            background: url('/img/cut-splash-01.jpg')
            background-size: 210%
            background-position: 50% 25%
        &:nth-child(2)
            background: url('/img/cut-splash-02.jpg')
            background-size: 120%
            background-position: 80% 40%
        &:nth-child(3)
            background: url('/img/cut-splash-03.jpg')
            background-size: 120%
            background-position: 50% 35%
        &:nth-child(4)
            background: url('/img/cut-splash-04.jpg')
            background-size: 145%
            background-position: 40% 50%
        &:nth-child(6)
            background: url('/img/cut-splash-05.jpg')
            background-size: 185%
            background-position: 45% 20%
        &:nth-child(7)
            background: url('/img/cut-splash-06.jpg')
            background-size: 162%
            background-position: 50% 12%
        &:nth-child(8)
            background: url('/img/cut-splash-07.jpg')
            background-size: 110%
            background-position: 80% 45%
        &:nth-child(9)
            background: url('/img/cut-splash-08.jpg')
            background-size: 145%
            background-position: 50% 45%
        &.mid
            justify-content: space-evenly
            width: 100%
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