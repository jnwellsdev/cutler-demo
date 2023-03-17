<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
const gameStore = useGameStore()

const { outroCopy, isScore, bg1 } = storeToRefs(gameStore)
const { handleView, handleNext } = useGameStore()
</script>
<template lang='pug'>
.intro-screen
    header
        p Do you know
        img.cut-logo(src='/img/cut-logo-intro.svg')
    section(:style='bg1')
        .over
        .score
            h1(v-html='outroCopy.score1')
            h2 {{ isScore }}
            h1(v-html='outroCopy.score2')
        p(v-html='outroCopy.copy')
    footer
        button.primary(@click='window.open("https://www.cutlersalon.com/", "_blank")') {{outroCopy.button}}
</template>
<style lang='sass' scoped>
.intro-screen
    @include flex-center-absolute
    flex-flow: column
    header, section, footer
        @include flex-center
    header
        max-height: 120px
        z-index: 10
        .cut-logo
            max-width: 44%
            margin: -0.5% 0 0 1%
        p
            margin-top: -2%
    section
        line-height: 1.15
        max-height: 100%
        .score
            background: $cut-white
            padding: 1rem 2rem
            margin-bottom: 1.5rem
            z-index: 1
            h1
                text-transform: uppercase
                font-size: 1.15rem
                font-weight: 700
                &:nth-of-type(2)
                    font-size: 1.1rem
                    font-weight: 500
                    
            h2
                font-size: 5rem
                font-weight: 700
        p
            font-size: 1.3rem
            font-weight: 700
            padding: 1rem 0 3rem 0
            max-width: 88%
            text-shadow: 0 0 6px rgb(255 255 255 / 30%)
            z-index: 1
        .over
            position: absolute
            width: 100%
            height: 100%
            background: rgb(255 255 255 / 60%)
    footer
        max-height: 80px
        button
            width: 250px
            height: 40px
            border-radius: 20px 0
</style>