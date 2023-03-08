<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs} from 'pinia'
const gameStore = useGameStore()
const {currentView,introCopy} = storeToRefs(gameStore)
</script >

<template lang='pug'>
.main-screen(:class='currentView')
    header
        h1 {{introCopy.title}}
    section
        <Intro/>
    footer
        h2 footer Monkey
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
        position: relative
        width: 100vw
        height: 100%

@media only screen and (min-device-width: 320px) and (max-device-width: 920px) and (orientation: portrait)
    .intro-module
        .welcome
            grid-template-rows: 1fr 4.5fr 1fr
            &.alt
                grid-template-rows: 0.5fr 1fr 1fr
                .modal
                    grid-template-rows: 0.5fr 3.5fr 1fr
            header
                align-items: flex-start
                a
                    max-width: 100%
                .ren-logo
                    max-width: 100%
                    top: 0
                    height: auto
            section
                align-items: center
                h1
                    width: 92%
                    line-height: 1
                    font-size: 3.5rem
                .fb-logo
                    width: 100%
                    margin-bottom: 0
                .option
                    flex-flow: column
                    button
                        max-width: 80%
                        height: 90px
                .modal
                    grid-template-rows: auto
                    width: 92%
                    background-image: url(~static/bg-modal-left.svg), url(~static/bg-modal-right.svg)
                    background-position: top left
                    header
                        h1
                            font-size: 2.2rem
                            max-width: 80%
                    section
                        p
                            font-size: 2.2rem
                            line-height: 2.8rem
                        span
                            font-size: 2rem
                    footer
                        padding-bottom: 2rem
                        button
                            align-items: center
                            height: 90px
                            max-width: 98%
                            font-size: 2rem
                button
                    align-self: center
                    height: 90px
                    max-width: 70%
                    font-size: 2rem
</style>