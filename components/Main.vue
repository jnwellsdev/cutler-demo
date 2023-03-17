<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
import { playSplash, playForm, playVideo, playQuestion, playNext } from '~/assets/gsap'

const gameStore = useGameStore()
const { currentView, currentAnimate, introCopy, isForm } = storeToRefs(gameStore)
const { handleAnimate } = gameStore

watch(currentAnimate, async (val) => {
    await nextTick()
    val === 'form' && playForm()
    val === 'video' && playVideo()
    val === 'question' && playQuestion()
    val === 'next' && playNext()
    setTimeout(() => {
        handleAnimate('')
    }, 1000)
})

onMounted(() => {
    playSplash()
})

</script>

<template lang='pug'>
include ../assets/pug/index
.dev-mobile
    .main-screen(:class='currentView')
        Splash(v-if='currentView == "splash"')
        Intro(v-if='currentView == "intro"')
        Video(v-if='currentView == "video"')
        Questions(v-if='currentView == "questions"')
        ModulesForm(v-if='isForm')
</template>

<style lang='sass'>
.dev-mobile
    container: inline-size
    position: relative
    width: 350px
    height: 725px
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
</style>