<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
const gameStore = useGameStore()
const { currentQuestion, isResponse, isFreeze, isCorrect, isAnswered, isQuestion } = storeToRefs(gameStore)
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
                    h1 {{ `Answer ${isQuestion}` }}
                    p {{ currentQuestion.text }}
                span(v-else)
                    h1 {{ `Question ${isQuestion}` }}
                    p {{ currentQuestion.text }}
            section
                .response(v-if='isResponse')
                    p {{  isCorrect ? currentQuestion.right : currentQuestion.wrong }}
                    p {{  currentQuestion.response }}
                .option(v-else v-for='option, i in currentQuestion.options.slice(1)')
                    button(@click='handleOptionClick' :data-choice='option' :data-option='i + 1' ) {{ option }}
            footer
    footer
        button(v-if='isResponse' @click='handleNext').primary next

</template>



<style lang='sass' scoped>
.question-screen
    @include flex-center-absolute
    display: grid
    grid-template-rows: 0.75fr 4fr 0.5fr
    header, section, footer
        @include flex-center
        width: 100%
        z-index: 2
    header
        .cut-logo
            max-width: 30%
            margin-top: -2.5%
            path
                fill: $cut-black
    section
        background-image: url('img/cut-bg-1.jpg')
        background-size: cover
        background-position: 50% 50%
        margin: 0 -10% // idk ?
        width: 120%
        .modal
            display: grid
            grid-template-rows: auto auto 1fr
            width: 80%
            height: 70%
            border-radius: 50px 0
            color: $cut-black
            background: rgb(255 255 255 / 82%)
            header, section, footer
                @include flex-center
                padding: 0 5%
            header
                line-height: 1.15
                padding-top: 5%
                h1
                    text-transform: uppercase
                    font-size: 1.15rem
                p
                    font-size: 1.35rem
                    font-weight: 700
                    padding: 1rem 0
            section
                background: none // 
                width: 100%
                margin: 0
                .option
                    width: 100%
                    margin: 2.5% 0
                    button
                        height: 50px
                        border-radius: 20px 0
                        border: 0
                        box-shadow: -4px 4px 4px rgb(0 0 0 / 8%)
                        font-weight: 600
                .response
                    width: 80%
                    line-height: 1.25
                    p
                        font-size: 1.35rem
                        font-weight: 500
                        padding: 1rem 0
    footer
        button
            width: 225px
            height: 40px
            border-radius: 20px 0
</style>