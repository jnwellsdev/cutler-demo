<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs} from 'pinia'
const gameStore = useGameStore()
const { formCopy, formResponse, formData } = storeToRefs(gameStore)
const { handleForm } = gameStore
</script >

<template lang='pug'>
.form-module
    .enter
        header
        section
            .modal
                header(v-if='!formResponse')
                    h1(v-html='formCopy.title')
                    h2(v-html='formCopy.copy')
                header(v-else)
                    h1(v-html='formCopy.endTitle')
                section
                    .form
                        p(v-if='!formResponse')
                            label(for='first_name')
                                span *
                                | First Name
                            input(type='text' v-model='formData.first_name')
                            label(for='last_name')
                                span *
                                | Last Name
                            input(type='text' v-model='formData.last_name')
                            label.mb-0.pb-0.leading-5(for='email')
                                span *
                                | Email 
                            input(type='email' v-model='formData.email')
                        .response(v-else)
                            // img.max-h-64.mx-auto.pb-2(:src='formCopy.image')
                            p.form-response(v-html='formResponse')
                    footer
                        button.primary(@click='handleForm(formData)' v-if='!formResponse') Submit
                        .option(v-else)
                            button.primary(@click='handleView("introVideo")') NEXT
        footer
</template>

<script>
export default {
    data() {
        return {
            // formData: {
            //     first_name: '',
            //     last_name: '',
            //     email: '',
            //     score: '35',
            // }
        }
    },
}
</script>

<style lang='sass' scoped>
.form-module
    display: flex
    justify-content: center
    position: relative
    width: 100%
    z-index: 1
    @include max
    .enter
        display: grid
        grid-template-rows: 0.5fr 4fr 0.5fr
        width: 100%
        height: 100vh
        header, section, footer
            @include flex-center
        section
            .modal
                display: grid
                grid-template-rows: 1fr auto
                width: 80%
                height: auto
                border-radius: 2px
                border: 4px solid 
                color: $fb-white
                // opacity: 0 
                //translate: 0 50% //
                background: rgb(16 58 36 / 65%)
                background-image: url(~static/bg-modal-top.svg), url(~static/bg-modal-btm.svg)
                background-size: 100%
                background-position: top, bottom
                background-repeat: no-repeat
                header, section, footer
                    @include flex-center
                    flex-direction: column
                    padding: 1em 5% 1rem
                header
                    h1
                        font-family: 'sporty-pro', sans-serif
                        font-size: 2.25rem
                        font-weight: 500
                        text-transform: uppercase
                        text-shadow: 4px -4px 0 rgb(0 0 0 / 0.15), 4px 4px 0 rgb(0 0 0 / 0.15), -4px 4px 0 rgb(0 0 0 / 0.15), -4px -4px 0 rgb(0 0 0 / 0.15)
                    h2
                        @include font-round-reg
                        color: $fb-white
                        font-size: 1.5rem
                section
                    @include font-round-reg
                    display: flex
                    color: $fb-white
                    padding-top: 0
                    .form
                        display: flex
                        flex-flow: column
                        justify-content: center
                        width: 100%
                        max-width: 80%
                        input, label
                            display: flex
                            font-size: 80%
                            font-weight: 500
                            text-align: left
                            padding: 0.5rem
                            font-weight: 600
                            span
                                font-size: 90%
                                text-align: left
                        input
                            border-radius: 2px
                            padding: 0.75rem 0.75rem 0.75rem 0.75rem
                            margin-bottom: 1em
                            border: 3px solid $fb-white
                            background: rgb(0 0 0 / 25%)
                            width: 100%
                            margin: auto auto 2% 
                            font-size: 100%
                            font-weight: 300
                            &:focus-visible
                                outline-color: green
                                outline-style: solid
                        button
                            margin: 2rem auto
                        .response
                            p
                                line-height: 1.1
                footer
                    width: 100%
                    .option
                        width: 100%
                        display: flex
                        justify-content: space-evenly
                        button
                            height: 60px
                            font-size: 1.35rem
                            margin: 0 0.5rem
                            max-width: 100%
@media only screen and (max-device-width: 550px) and (orientation: portrait)
    .option
        flex-direction: column
        button
            margin: 4% auto

</style>
