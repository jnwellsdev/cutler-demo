<script setup>
    import { useGameStore } from '~/store/game'
    import { storeToRefs} from 'pinia'
    const gameStore = useGameStore()
    const { currentQuestion, isResponse, isFreeze, isCorrect, isAnswered } = storeToRefs(gameStore)
    const {handleOptionClick} = gameStore
</script >
<template lang='pug'>
.question-module
    .question
        header
        section
            .modal(:class='{alt: response}')
                header
                    h1(v-if='response') {{ answer ? currentQuestion.right : currentQuestion.wrong }}
                    h1(v-else v-html='currentQuestion.text')
                section
                    .response(v-if='response')
                        p {{ currentQuestion.response }}
                    p(v-else) {{ currentQuestion.text }}
                footer
                    button(v-if='response' @click='handleView').primary NEXT
                    .option(v-else v-for='option, i in currentQuestion.options.slice(1)')
                        button(@click='handleOptionClick' :data-choice='option' :data-option='i + 1' :class='(isCorrect && isAnswered) ? "correct" : (!isCorrect && isAnswered) ? "incorrect":""') {{ option }}
        footer
</template>
<script>

export default {
        methods: {
        // handleAnswer(event) {
        //         console.log(event.target.dataset.option)
        //     // +event.target.dataset.option === this.gameStore.currentQuestion.correct
        //     // ? (this.gameStore.commit('handleAnswer', true),
        //     // event.currentTarget.classList.add('correct'))
        //     // : (this.gameStore.commit('handleAnswer', false),
        //     // event.currentTarget.classList.add('incorrect'))
        //     // this.gameStore.commit('handleFreeze', { val: true, time: 2500 })
        //     // this.gameStore.commit('handleTimer')
        //     // setTimeout(() => this.gameStore.commit('handleResponse', true), 2000)

        //     //SET UP ANALYTICS
        //     //   this.$store.commit('GA_DATAHANDLE', {
        //     //       question: this.data.text,
        //     //       choice: event.target.dataset.choice,
        //     //       category: 'Love That Mobile | ' + 'Category: ' + this.category,
        //     //   }
        //     // )
        // }
    }
}
</script>


<style lang='sass' scoped>
.question-module
    display: flex
    justify-content: center
    position: relative
    width: 100%
    z-index: 1
    @include max
    .question
        display: grid
        grid-template-rows: auto 4fr 0.5fr
        width: 100%
        height: 100vh
        header, section, footer
            @include flex-center
        header
            position: relative
        section
            flex-flow: column
            h1
                font-family: 'sporty-pro', sans-serif
                font-size: 2.85rem
                letter-spacing: 3px
                font-weight: 500
                color: $fb-white
                text-shadow: 4px -4px 0 rgb(0 0 0 / 0.15), 4px 4px 0 rgb(0 0 0 / 0.15), -4px 4px 0 rgb(0 0 0 / 0.15), -4px -4px 0 rgb(0 0 0 / 0.15)
                line-height: 1.15
                margin: 0
            .modal
                display: grid
                grid-template-rows: auto auto 1fr
                width: 80%
                height: auto
                margin-top: 25px
                border-radius: 2px
                border: 4px solid 
                color: $fb-white
                // opacity: 0 //
                // translate: 0 50% //
                background: rgb(16 58 36 / 65%)
                background-image: url(~static/bg-modal-top.svg), url(~static/bg-modal-btm.svg)
                background-size: 100%
                background-position: top, bottom
                background-repeat: no-repeat
                position: relative
                header, section, footer
                    @include flex-center
                    padding: 0 5%
                header
                    padding-top: 5%
                    h1
                        font-family: 'sporty-pro', sans-serif
                        font-weight: 500
                        font-size: 2.5rem
                        letter-spacing: 1px
                        text-transform: uppercase
                        text-shadow: 4px -4px 0 rgb(0 0 0 / 0.15), 4px 4px 0 rgb(0 0 0 / 0.15), -4px 4px 0 rgb(0 0 0 / 0.15), -4px -4px 0 rgb(0 0 0 / 0.15)
                section
                    @include font-round-reg
                    max-width: 850px
                    margin: auto
                    p
                        font-size: 1.65rem
                        font-weight: 700
                        letter-spacing: 1px
                        line-height: 1.35
                        text-shadow: 0 0 30px rgb(0 34 17 / 80%)
                    .response
                        display: grid
                        grid-template-rows: auto
                        height: 100%
                        width: 100%
                        justify-content: center
                        align-content: space-around
                        img
                            max-height: 220px
                            border-radius: 2px
                            margin: 2rem auto
                            border: 5px solid $fb-white
                        p
                            font-size: 1.55rem
                            padding-bottom: 1rem
                footer
                    flex-flow: row wrap
                    align-items: flex-start
                    padding: 2.5rem 5% 2.5rem 5%
                    .option
                        width: 49%
                        margin: 0 0.25%
                        height: 40%
                        &:nth-child(odd)
                            text-align: right
                            padding-right: 5px
                        &:nth-child(even)
                            text-align: left
                            padding-left: 5px
                        button
                            font-family: 'museo-sans-rounded'
                            font-size: 1.15rem
                            font-weight: 700
                            letter-spacing: 0.005rem
                            max-width: 100%
                            min-height: 50px
                            max-height: 100%
                            box-shadow: 0 0 20px rgb(34 34 34 / 40%)

@media only screen and (min-device-width: 320px) and (max-device-width: 920px) and (orientation: portrait)
    .question-module
        .question
            grid-template-rows: 1fr 4fr 2fr
            section
                .modal
                    grid-template-rows: 0.5fr 1fr auto
                    width: 92%
                    background-image: url(~static/bg-modal-left.svg), url(~static/bg-modal-right.svg)
                    background-position: top left
                    &.alt
                        grid-template-rows: 0fr 3.5fr 1fr
                    header
                        padding: 1rem 0 0 0
                        h1
                            font-size: 3rem
                            max-width: 80%
                            line-height: 1.15
                    section
                        height: 100%
                        p
                            font-size: 2rem
                            padding: 1rem 0
                        .response
                            height: auto
                            align-content: flex-start
                            img
                                width: 98%
                                max-height: 100%
                                margin: -1.5rem auto  0 auto
                            p
                                font-size: 2rem
                                padding: 1rem 0 3rem 0
                    footer
                        flex-flow: column
                        align-items: center
                        button
                                height: 90px
                                max-width: 98%
                                font-size: 2rem
                        .option
                            width: 100%
                            text-align: center !important
                            padding-right: 0 !important
                            margin-bottom: 1rem
                            button
                                height: 80%
                                max-width: 90%
                                margin: 5% auto
                                align-items: center
                                font-size: 1.5rem
</style>