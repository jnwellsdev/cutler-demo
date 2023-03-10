<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs} from 'pinia'
const gameStore = useGameStore()
const {currentView, introCopy} = storeToRefs(gameStore)
</script>

<template lang='pug'>
include ../assets/pug/index
.main-screen(:class='currentView')
    header
        h1 {{introCopy.title}}
        +logo
    section
        <Intro v-if="currentView == 'intro'"/>
        <Form v-if="currentView == 'form'"/>
        <Questions v-if="currentView == 'questions'"/>
    footer
        h2 footer
    ModulesBackground
</template>

<style lang='sass'>
.main-screen
    @include flex-center-absolute
    display: grid
    grid-template-rows: 0fr 4fr 2fr
    overflow: hidden
    font-size: 150%
    font-weight: 600
    height: 100vh
    header, section, footer
        @include flex-center
        flex-direction: column
        position: relative
        width: 100vw
        height: 100%
        
/* Extracted SVG Styles */
path.cls-1
    fill: white

</style>