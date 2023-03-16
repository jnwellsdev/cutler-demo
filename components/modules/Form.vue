<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
const gameStore = useGameStore()
const { formCopy, formResponse, formData } = storeToRefs(gameStore)
const { handleForm, handleNext } = gameStore
</script>

<template lang='pug'>
.form-module
    .title
        p Do you know
        img.logo(src='img/cut-logo-intro.svg')
    .form
        p(v-if='!formResponse')
            input(type='text' placeholder='Name' v-model='formData.first_name')
            input(type='email' placeholder='Email' v-model='formData.email')
        .response(v-else)
            p.form-response(v-html='formResponse')
    .submit
        button(@click='handleNext') Submit
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
    @include flex-center-absolute
    flex-flow: column
    z-index: 20
    background: rgb(255 255 255 / 88%)
    .title
        position: absolute
        height: 100px
        top: 24%
        p
            margin-top: -2%
    .form
        @include flex-center
        input
            padding: 0.25rem 0.25rem 0.35rem 1rem
            margin: 0.75rem 0
            border: 3px solid $cut-black
            color: $cut-black
            background: $cut-white
            width: 90%
            font-size: 80%
            font-weight: 500
            height: 48px
            border-radius: 12px 0
            &:focus-visible
                outline-color: green
                outline-style: solid
        button
            margin: 2rem auto
        .response
            p
                line-height: 1.1
    .submit
        position: absolute
        height: 100px
        bottom: 24%
        button
            width: 175px
            height: 40px
            border-radius: 20px 0          
    ::placeholder
        color: $cut-black

</style>
