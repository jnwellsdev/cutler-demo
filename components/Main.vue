<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
import { playSplash, playForm, playVideo, playQuestion, playNext, playResponse, playNextVideo, playVideoResponse, playFade, playVideoExit, playBumper } from '~/assets/gsap'

const gameStore = useGameStore()
const { currentView, currentAnimate, currentSection, introCopy, isForm, isFreeze } = storeToRefs(gameStore)
const { handleAnimate, preloadImages, handleQuestion, handleVideo, handleFreeze, getCSRF } = gameStore

// watcher for gsap animations
watch(currentAnimate, async (val) => {
    await nextTick()
    val === 'form' && playForm()
    val === 'video' && (playVideo(), currentSection.value === 2 && handleVideo())
    val === 'question' && playQuestion()
    val === 'next' && (playNext(), setTimeout(() => { playFade(), handleQuestion() }, 1100))
    val === 'response' && playResponse()
    val === 'nextVideo' && (playNextVideo(), setTimeout(() => { handleQuestion() }, 1000))
    val === 'videoResponse' && playVideoResponse()
    val === 'videoExit' && (playVideoExit(), setTimeout(() => { handleVideo(), playBumper() }, 750))
    setTimeout(() => {
        handleAnimate('')
    }, 1000)
})

onMounted(() => {
    playSplash()
    handleFreeze(true, 3000)
    preloadImages([
        'cut-splash-1.jpg', 'cut-splash-2.jpg', 'cut-splash-3.jpg', 'cut-splash-4.jpg',
        'cut-bg-1.jpg', 'cut-bg-2.jpg', 'cut-bg-3.jpg', 'cut-bg-4.jpg', 'cut-bg-5.jpg',
        'cut-bg-6.jpg', 'cut-bg-7.jpg', 'cut-bg-8.jpg', 'cut-bg-9.jpg', 'cut-bg-10.jpg',
        'cut-bg-11.jpg', 'cut-bg-12.jpg', 'cut-bg-13.jpg', 'cut-bg-14.jpg', 'cut-bg-15.jpg'])
    getCSRF()
})

</script>

<template lang='pug'>
include ../assets/pug/index
.dev-mobile
    .main-screen(:class='[currentView, {freeze: isFreeze}]')
        Splash(v-if='currentView == "splash"')
        Intro(v-if='currentView == "intro"')
        Video(v-if='currentView == "video"')
        Questions(v-if='currentView == "questions"')
        Outro(v-if='currentView == "outro"')
        ModulesForm(v-if='isForm')
</template>

<style lang='sass'>
.dev-mobile
    container: inline-size
    position: relative
    width: 350px
    height: 725px
    margin-top: 1rem
    outline: 20px solid rgb(255 255 255 / 8%)
.main-screen
    @include flex-center-absolute
    display: grid
    grid-template-rows: 0fr 4fr 2fr
    overflow: hidden
    font-size: 150%
    font-weight: 600
    background: $cut-white
    header, section, footer
        @include flex-center
        flex-direction: column
        position: relative
        width: 100%
        height: 100%
    &.splash
        grid-template-columns: 1fr
@media only screen and (min-device-width: 320px) and (max-device-width: 920px) and (orientation: portrait)
    .dev-mobile
        width: 100%
        height: 100vh
        outline: none
        overflow: hidden
        margin: 0
</style>