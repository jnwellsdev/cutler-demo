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
        img.logo(src='/img/cut-logo-intro.svg')
    .form
        p(v-if='!formResponse')
            input(type='text' placeholder='First Name' v-model='formData.first_name')
            input(type='text' placeholder='Last Name' v-model='formData.last_name')
            input(type='email' placeholder='Email' v-model='formData.email')
            select(name="salon" v-model='formData.salon')
                option(value="" selected="true") -- SELECT --
                option(value="Soho") Soho
                option(value="58th Street") 58th Street
                option(value="Brooklyn") Brooklyn
                option(value="West Hollywood") West Hollywood
        .response(v-else)
            p.form-response(v-html='formResponse')
    .submit(v-if='!formResponse')
        button(@click='handleForm(formData)') Submit
    .submit(v-else)
        button(@click='handleNext') Next
</template>

<script>
export default {
    data() {
        return {
            // formData: {
            //     first_name: '',
            //     email: '',
            //     salon: '',
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
        top: 15%
        p
            margin-top: -2%
    .form
        @include flex-center
        input, select
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
        bottom: 10%
        button
            width: 175px
            height: 40px
            border-radius: 20px 0          
    ::placeholder
        color: $cut-black

</style>
