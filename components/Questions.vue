<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
const gameStore = useGameStore()
const { currentQuestion, currentSection, isResponse, isFreeze, isCorrect, isAnswered, isQuestion, bg1, bg2 } = storeToRefs(gameStore)
const { handleOptionClick, handleView, handleNext } = gameStore

</script>
<template lang='pug'>
include ../assets/pug/index
.question-screen
    header
        +logo
    section
        .modal
            header
                .response(v-if='isResponse')
                    h1 {{ `Answer ${currentSection === 1 ? isQuestion : isQuestion + 7}` }}
                    p {{ currentQuestion.text }}
                span(v-else)
                    h1 {{ `Question ${currentSection === 1 ? isQuestion : isQuestion + 7}` }}
                    p {{ currentQuestion.text }}
            section
                .response(v-if='isResponse')
                    h1 {{  isCorrect ? currentQuestion.right : currentQuestion.wrong }}
                    p {{  currentQuestion.response }}
                .option(v-else v-for='option, i in currentQuestion.options.slice(1)')
                    button(@click='handleOptionClick' :data-choice='option' :data-option='i + 1' :key='i + 1' ) {{ option }}
        .section-bg.first(:style='bg1')
        .section-bg.next(:style='bg2')
    footer
        button(v-if='isResponse' @click='handleNext').primary next

</template>



<style lang='sass' scoped>
.question-screen
    @include flex-center-absolute
    flex-flow: column
    header, section, footer
        @include flex-center
        width: 100%
        z-index: 2
    header
        max-height: 120px
        .cut-logo
            max-width: 30%
            margin-top: -2%
            path
                fill: $cut-black
    section
        .section-bg
            @include flex-center
            width: 100%
            height: 100%
            position: absolute
            background: url('img/cut-bg-1.jpg')
            background-size: cover
            background-position: 50% 50%
            &.first
                z-index: 1
            &.next
                z-index: 0
        .modal
            display: grid
            grid-template-rows: auto auto 1fr
            width: 88%
            min-height: 408px
            border-radius: 50px 0
            color: $cut-black
            background: rgb(255 255 255 / 82%)
            z-index: 2
            header, section, footer
                @include flex-center
                padding: 0 5%
            header
                line-height: 1.15
                padding-top: 5%
                max-height: 100%
                h1
                    text-transform: uppercase
                    font-size: 1.15rem
                p
                    font-size: 1.35rem
                    font-weight: 700
                    padding: 1rem 0
            section
                background: none // idk ?
                width: 100%
                margin: 0
                padding-bottom: 5%
                .option
                    width: 100%
                    margin: 2.5% 0
                    button
                        height: 50px
                        border-radius: 20px 0
                        border: 3px solid transparent
                        padding: 0.55rem 0.7rem 0.65rem 0.7rem
                        box-shadow: -4px 4px 4px rgb(0 0 0 / 8%)
                        font-weight: 600
                        line-height: 1.05
                        font-size: 0.88rem
                .response
                    display: flex
                    align-items: center
                    justify-content: center
                    flex-flow: column
                    min-height: 200px
                    line-height: 1.35
                    h1
                        font-size: 1.3rem
                        padding-bottom: 0.5rem
                    p
                        font-size: 1.15rem
                        font-weight: 500
                        padding-bottom: 1rem
    footer
        max-height: 80px
        button
            width: 225px
            height: 40px
            border-radius: 20px 0
</style>