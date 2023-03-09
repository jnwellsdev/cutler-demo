<script setup>
    import { useGameStore } from '~/store/game'
    import { storeToRefs} from 'pinia'
const gameStore = useGameStore()

const { introCopy, isIntro } = storeToRefs(gameStore)
const { handleView, handleNext} = useGameStore()
</script >
<template lang='pug'>
.intro-module
    .welcome
        section
            .modal
                header
                section
                    span(v-html='introCopy.copy')
                    span.cta(v-html="introCopy.cta")
                footer
                    button.primary(@click="handleNext") {{introCopy.button}}
        footer
</template>
<style lang='sass'>
.intro-module
    display: flex
    justify-content: center
    width: 100%
    z-index: 1
    @include max
    .welcome
        display: grid
        grid-template-rows: 1fr 4fr 0.5fr
        width: 100%
        height: 100vh
        header, section, footer
            @include flex-center
        header
            position: relative
            min-height: 110px
        section
            position: relative
            h1
                font-family: 'sporty-pro', sans-serif
                font-size: 2.85rem
                letter-spacing: 3px
                font-weight: 500
                color: $fb-white
                text-shadow: 4px -4px 0 rgb(0 0 0 / 0.15), 4px 4px 0 rgb(0 0 0 / 0.15), -4px 4px 0 rgb(0 0 0 / 0.15), -4px -4px 0 rgb(0 0 0 / 0.15)
                line-height: 1.15
                margin: -1rem 0 2rem 0
                // opacity: 0 
            .modal
                z-index: 10000
                display: grid
                grid-template-rows: 0.5fr auto 1.5fr
                width: 80%
                height: auto
                border-radius: 2px
                border: 4px solid 
                color: $fb-white
                // opacity: 0 
                // translate: 0 50% 
                background: rgb(16 58 36 / 65%)
                background-image: url(~static/bg-modal-top.svg), url(~static/bg-modal-btm.svg)
                background-size: 100%
                background-position: top, bottom
                background-repeat: no-repeat
                header, section, footer
                    @include flex-center
                    padding: 0 5%
                header
                    @include font-round-reg
                    font-size: 2.25rem
                    padding-top: 25px
                    line-height: 1.15
                section
                    @include font-round-reg
                    span
                        font-size: 1.65rem
                        font-weight: 700
                        letter-spacing: 1px
                        line-height: 1.35
                        text-shadow: 0 0 30px rgb(0 34 17 / 80%)
                        span
                            display: block
                        &.cta
                            font-size: 2rem
                            margin-top: 50px
                            font-weight: 700

            .option
                width: 100%
                display: flex
                align-self: flex-end
                justify-content: center
                z-index: 2
                button
                    max-width: 325px
                    height: 60px
                    margin: 2rem 1rem 0 1rem
        &.alt
            grid-template-rows: 0.5fr auto 0.5fr
            header
                a
                    pointer-events: none
            section
                flex-flow: column

</style>