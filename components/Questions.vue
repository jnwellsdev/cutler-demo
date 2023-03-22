<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
const gameStore = useGameStore()
const { currentQuestion, currentSection, isResponse, isVideoResponse, isFreeze, isCorrect, isAnswered, isQuestion, bg1, bg2 } = storeToRefs(gameStore)
const { handleOptionClick, handleView, handleNext } = gameStore

watch(isVideoResponse, async (val) => {
    await nextTick()
    if (val) {
        const vid = document.querySelector('#vid')
        const player = new Vimeo.Player(vid)

        player.getVideoId().then((id) => console.log(`player: ${id}`))

        player.on('ended', (data) => {
            console.log('ended')
            player.setCurrentTime(0)
            player.pause()
        })
    }
})

</script>
<template lang='pug'>
include ../assets/pug/index
.question-screen(:class='{video: isVideoResponse}')
    header
        +logo
    section(v-if='!isVideoResponse')
        .modal
            header
                .response(v-if='isResponse')
                    //- h1(v-html='`Answer ${currentSection === 1 ? isQuestion : isQuestion + 7}`')
                    h1 &nbsp;
                    p {{ currentQuestion.text }}
                span(v-else)
                    h1(v-html='`Question ${currentSection === 1 ? isQuestion : isQuestion + 7} <span style="font-weight:400; color: #222">/ 14</span>`')
                    p {{ currentQuestion.text }}
            section
                .response(v-if='isResponse')
                    h1.right(v-if='isCorrect') {{  currentQuestion.right}}
                    h1.wrong(v-if='!isCorrect') {{ currentQuestion.wrong }}
                    p {{  currentQuestion.response }}
                .option(v-else v-for='option, i in currentQuestion.options.slice(1)')
                    button(@click='handleOptionClick' :data-choice='option' :data-option='i + 1') {{ option }}
        .section-bg.first(:style='bg1')
        .section-bg.next(:style='bg2')
    section.video-response(v-else)
        header
            .response
                //- h1(v-html='`Answer ${currentSection === 1 ? isQuestion : isQuestion + 7}`')
                h1(v-if='isCorrect') {{  currentQuestion.right}}
                h1(v-if='!isCorrect') {{ currentQuestion.wrong }}
                p {{ currentQuestion.options[currentQuestion.correct] }}
                .caption
                    span Mary Jones
                    span Stylist
                    span Cutler Soho
        .over
        .video-bg
            iframe#vid(:src='`https://player.vimeo.com/video/${currentQuestion.videoId}?h=ff9b27b760?byline=false&portrait=true&title=false&transparent=0&gesture=media&autoplay=1`' width='640' height='1138' allowfullscreen allowtransparency autoplay allow='autoplay')
    footer
        button(v-if='isResponse || isVideoResponse' @click='handleNext').primary next
</template>



<style lang='sass' scoped>
.question-screen
    @include flex-center-absolute
    flex-flow: column
    header, section, footer
        @include flex-center
        width: 100%
        // z-index: 2
    header
        max-height: 120px
        z-index: 10
        .cut-logo
            max-width: 30%
            margin-top: -2%
            path
                fill: $cut-black
    section
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
                        &.right
                            color: $cut-green
                        &.wrong
                            color: $cut-red
                    p
                        font-size: 1.15rem
                        font-weight: 500
                        padding-bottom: 1rem
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
        &.video-response
            justify-content: flex-end
            position: relative
            header
                .response
                    line-height: 1.35
                    color: $cut-white
                    max-width: 86%
                    h1
                        font-size: 1.3rem
                        padding-bottom: 0.25rem
                        font-weight: 600
                        text-shadow: 0 0 12px rgb(0 0 0 / 30%)
                    p
                        font-size: 1.15rem
                        font-weight: 500
                        text-shadow: 0 0 12px rgb(0 0 0 / 30%)
                        padding-bottom: 0.25rem
                    .caption
                        opacity: 0.88
                        span
                            font-size: 0.78rem
                            font-weight: 400
                            padding-left: 0.2rem
                            text-shadow: 0 0 12px rgb(0 0 0 / 50%)
                            &:nth-child(1)
                                font-weight: 600
                                &:after
                                    content: '/' 
                                    padding-left: 0.25rem
                                    font-weight: 400
                            &:nth-child(2)
                                &:after
                                    content: '/' 
                                    padding-left: 0.25rem
            .over
                position: absolute
                width: 100%
                height: calc(100% + 120px)
                top: -120px
                background: rgb(0 0 0 / 20%)
                z-index: 1
                pointer-events: none
            .video-bg
                position: absolute
                width: calc(105% + 120px)
                height: calc(105% + 120px)
                top: calc(-120px - 5%)
                left: calc((-5% - 120px) / 2)
                iframe
                    position: absolute
                    width: 100%
                    height: 100%
                    object-fit: cover
                    z-index: 0

    footer
        max-height: 80px
        button
            width: 225px
            height: 40px
            border-radius: 20px 0
    &.video
        background: $cut-black
        header
            .cut-logo
                path
                    fill: $cut-white
        footer
            background: $cut-white
</style>