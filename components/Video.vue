<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
const gameStore = useGameStore()

const { introCopy, isIntro } = storeToRefs(gameStore)
const { handleView, handleNext } = useGameStore()

onMounted(() => {
    const iframe = document.querySelector('iframe')
    const player = new Vimeo.Player(iframe)

    console.log(player)

})
</script>
<template lang='pug'>
include ../assets/pug/index
.video-screen
    header
        +logo
    section
        span(v-html='introCopy.copy')
        span.cta(v-html="introCopy.cta")
    footer
        button.primary(@click="handleNext") {{introCopy.button}}

    .background
        .over
        iframe(src='https://player.vimeo.com/video/68384616?loop=true&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media&muted=1&autoplay=1' allowfullscreen allowtransparency muted autoplay allow='autoplay')
</template>
<style lang='sass' scoped>
.video-screen
    @include flex-center-absolute
    display: grid
    background: $cut-black
    header, section, footer
        @include flex-center
        z-index: 2
    header
        .cut-logo
            max-width: 30%
            path
                fill: $cut-white
    section
        padding: 1rem 4%
        color: $cut-white
        line-height: 1.25
        font-weight: 400
        font-size: 1.35rem
        text-shadow: 0 0 6px rgb(0 0 0 / 30%)
        span:last-child
            margin-top: 1.35rem
    footer
        button
            height: 44px
            border-radius: 22px 0
            background: rgb(255 255 255 / 60%)
    .background
        position: absolute
        width: 100%
        height: 100%
        z-index: 1
        .over
            z-index: 1
            width: 100%
            height: 100%
            background: rgb(0 0 0 / 20%)
            position: relative
        iframe
            width: 120vw
            height: 120vh
            object-fit: cover
            position: absolute
            top: -35%
            left: -105%
            z-index: 0
</style>