<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
const gameStore = useGameStore()

const { introCopy, isIntro, currentSection, currentVideo } = storeToRefs(gameStore)
const { handleView, handleNext } = useGameStore()

onMounted(() => {
    const options = {
        id: gameStore.introCopy.video[gameStore.currentVideo],
        responsive: true,
        autoplay: true,
        loop: true,
        width: 'auto',
        background: 1,
        muted: 0
    }
    const bg = document.querySelector('.background')
    const player = new Vimeo.Player(bg, options)
    player.setVolume('0')
    player.setPlaybackRate('1.5')
    player.getVideoId().then((id) => console.log(`player: ${id}`))
    player.getVolume().then((vol) => console.log(`volume: ${vol}`))
    player.getPlaybackRate().then((val) => console.log(`speed: ${val}`))
})

watch(currentVideo, async (val) => {
    await nextTick()
    const options = {
        id: gameStore.introCopy.video[gameStore.currentVideo],
        responsive: true,
        autoplay: true,
        loop: true,
        width: 'auto',
        background: 0,
        muted: 0
    }
    const bg = document.querySelector('.background')
    const player = new Vimeo.Player(bg, options)

    player.setVolume('0.35')

    val === 2 && (player.loadVideo(gameStore.introCopy.video[gameStore.currentVideo]), player.setPlaybackRate('1'))
    val === 3 && (player.loadVideo(gameStore.introCopy.video[gameStore.currentVideo]), player.setPlaybackRate('1'))

    player.getVideoId().then((id) => console.log(`player: ${id}`))
    player.getVolume().then((vol) => console.log(`volume: ${vol}`))
    player.getPlaybackRate().then((val) => console.log(`speed: ${val}`))

})

</script>
<template lang='pug'>
include ../assets/pug/index
.video-screen
    header
        +logo
        .section-text(v-if='currentVideo !== 1')
            span(v-html='currentSection === 1 ? " The Cutler Brand" : " Services & Products"')
        .section-text(v-else)
            span Who is Cutler?
    section(v-if='currentSection === 1')
        span(v-html='introCopy.copy')
        span.cta(v-html='introCopy.cta')
    section.fill(v-else)
        span(v-html='introCopy.copy')
        span.cta(v-html='introCopy.cta')
    footer
        span(v-if='currentVideo === 1') – PLEASE, TURN ON YOUR AUDIO – 
        button.primary(@click="handleNext") {{currentVideo === 1 ? 'next' : currentVideo === 2 ? 'Take the Quiz' : currentVideo === 3 ? 'Continue the Quiz' : 'next'}}
    .background(:class='{bumper: currentVideo !== 1}')
        .over
</template>
<style lang='sass' scoped>
.video-screen
    @include flex-center-absolute
    display: grid
    background: $cut-black
    header, section, footer
        @include flex-center
        z-index: 3
    header
        .cut-logo
            max-width: 30%
            path
                fill: $cut-white
        .section-text
            color: $cut-white
            font-size: 1rem
            font-weight: 700
            letter-spacing: 0.01rem
            text-transform: uppercase
            text-shadow: 0 0 6px rgb(0 0 0 / 30%)
            height: 40px
    section
        padding: 1rem 5%
        color: $cut-white
        line-height: 1.25
        font-weight: 400
        font-size: 1.25rem
        text-shadow: 0 0 6px rgb(0 0 0 / 30%)
        pointer-events: none
        span:last-child
            margin-top: 1.35rem
        &.fill
            opacity: 0 !important
    footer
        span
            color: $cut-white
            font-size: 0.9rem
            font-weight: 300
            letter-spacing: 0.025rem
            text-transform: uppercase
            text-shadow: 0 0 6px rgb(0 0 0 / 30%)
            height: 40px
        button
            height: 44px
            border-radius: 22px 0
            background: rgb(255 255 255 / 60%)
    .background
        position: absolute
        width: 100%
        height: 100%
        z-index: 2
        width: calc(100% + 90px)
        height: calc(100% + 90px)
        top: -45px
        left: -45px
        .over
            position: relative
            width: 100%
            height: 100%
            background: rgb(0 0 0 / 50%)
            z-index: 2
            position: absolute
            pointer-events: none
        iframe
            position: absolute
            width: 100%
            height: 100%
            object-fit: cover
            z-index: 1
        &.bumper
            .over
                background: rgb(0 0 0 / 15%)
</style>