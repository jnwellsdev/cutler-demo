<script setup>
import { useGameStore } from '~/store/game'
import { storeToRefs } from 'pinia'
const gameStore = useGameStore()
const { formCopy, formResponse, formData, formError, errorMessage } = storeToRefs(gameStore)
const { handleForm, handleNext, handleError } = gameStore
function validateForm(formData) {
    (formData.email !== '' && formData.first_name !== '' && formData.last_name !== '') ? handleForm(formData) : handleError()
}
</script>

<template lang='pug'>
.form-module
    .title
        p First,
        p does <strong>Cutler</strong> know you?
    .form
        p(v-if='!formResponse')
            input(type='text' placeholder='First Name' v-model='formData.first_name')
            input(type='text' placeholder='Last Name' v-model='formData.last_name')
            input(type='email' placeholder='Email' v-model='formData.email')
            span.errors(v-if='formError') {{ errorMessage }}
            //- select(name="salon" v-model='formData.salon')
            //-     option(value="" selected="true") -- SELECT --
            //-     option(value="Soho") Soho
            //-     option(value="58th Street") 58th Street
            //-     option(value="Brooklyn") Brooklyn
            //-     option(value="West Hollywood") West Hollywood
        .response(v-else)
            p.form-response(v-html='formResponse')
    .submit(v-if='!formResponse')
        button(@click='validateForm(formData)') Let’s get started!
</template>

<script>
export default {
    data() {
        return {
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
        text-align: center
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
            &::placeholder
                opacity: .8
        button
            margin: 2rem auto
        .response
            max-width: 80%
            p
                line-height: 1.1
        .errors
            color: #fafafa
            font-size: medium
            display: block
            border: 3px solid
            width: 80%
            margin: 20px auto
            background: #444
            padding: 3px
    .submit
        position: absolute
        height: 100px
        bottom: 10%
        button
            width: 245px
            height: 40px
            border-radius: 20px 0          
    ::placeholder
        color: $cut-black

</style>
