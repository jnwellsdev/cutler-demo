<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
import { playSplash, playForm, playVideo, playQuestion, playNext, playResponse, playNextVideo, playVideoResponse, playFade, playVideoExit, playBumper, playFadeForm } from '~/assets/gsap'

const gameStore = useGameStore()
const { currentView, currentAnimate, currentSection, introCopy, isForm, isVideoResponse, isFreeze } = storeToRefs(gameStore)
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
    val === 'fadeForm' && playFadeForm()
    setTimeout(() => {
        handleAnimate('')
    }, 1000)
})

onMounted(() => {
    playSplash()
    handleFreeze(true, 3000)
    preloadImages([
        'cut-splash-01.jpg', 'cut-splash-02.jpg', 'cut-splash-03.jpg', 'cut-splash-04.jpg',
        'cut-splash-05.jpg', 'cut-splash-06.jpg', 'cut-splash-07.jpg', 'cut-splash-08.jpg'])
    setTimeout(() => {
        preloadImages(['cut-bg-1b.jpg', 'cut-bg-2b.jpg', 'cut-bg-3b.jpg', 'cut-bg-4b.jpg', 'cut-bg-5b.jpg',
            'cut-bg-6b.jpg', 'cut-bg-7b.jpg', 'cut-bg-8b.jpg', 'cut-bg-9b.jpg', 'cut-bg-10b.jpg',
            'cut-bg-11b.jpg', 'cut-bg-12b.jpg', 'cut-bg-13b.jpg', 'cut-bg-14b.jpg', 'cut-bg-15b.jpg'])
    }, 2000);
    // getCSRF()
})
</script>

<template lang='pug'>
include ../assets/pug/index
.dev-mobile
    .main-screen(:class='[currentView, {freeze: isFreeze}]')
        Splash(v-if='currentView == "splash"')
        Intro(v-if='currentView == "intro"')
        Video(:class='{hide: currentView !== "video", show: isVideoResponse === true}')
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
    body, html
        background-color: $cut-white
    .dev-mobile
        width: 100%
        height: 89vh
        outline: none
        overflow: hidden
        margin: 0
</style>