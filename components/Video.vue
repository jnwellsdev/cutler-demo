<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
const gameStore = useGameStore()

const { introCopy, isIntro, currentSection, currentVideo } = storeToRefs(gameStore)
const { handleView, handleNext } = useGameStore()

onMounted(() => {
    const iframe = document.querySelector('iframe')
    const player = new Vimeo.Player(iframe)
    player.getVideoId().then((id) => console.log(`player: ${id}`))
})

watch(currentVideo, async (val) => {
    const iframe = document.querySelector('iframe')
    const player = new Vimeo.Player(iframe)
    await nextTick()
    val === 2 && player.loadVideo(+gameStore.introCopy.video[gameStore.currentVideo])
    val === 3 && player.loadVideo(+gameStore.introCopy.video[gameStore.currentVideo])
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
        button.primary(@click="handleNext") {{currentVideo === 1 ? 'next' : currentVideo === 2 ? 'Take the Quiz' : currentVideo === 3 ? 'Continue the Quiz' : 'next'}}
    .background(:class='{bumper: currentVideo !== 1}')
        .over
        iframe(src='https://player.vimeo.com/video/811044194?loop=true&byline=false&background=1&portrait=true&title=false&speed=true&transparent=0&gesture=media&muted=1&autoplay=1' allowfullscreen allowtransparency muted autoplay allow='autoplay')
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
        span:last-child
            margin-top: 1.35rem
        &.fill
            opacity: 0 !important
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
        width: calc(100% + 60px)
        height: calc(100% + 60px)
        top: -30px
        right: 0
        &.bumper
            right: auto
            left: 0
        .over
            position: relative
            width: 100%
            height: 100%
            background: rgb(0 0 0 / 20%)
            z-index: 1
            position: absolute
        iframe
            position: absolute
            width: 100%
            height: 100%
            object-fit: cover
            z-index: 0
</style>