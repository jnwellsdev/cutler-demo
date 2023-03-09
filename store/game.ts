import { defineStore, acceptHMRUpdate } from 'pinia'
import data from '~/content/index.yml'

export const useGameStore = defineStore({
    id: 'game-store',
    state: () => ({
        data: data,
        view: 'intro',
        intro: true,
        formData: {
            first_name: '',
            last_name: '',
            email: '',
            score: ''
        },
        response: false,
        correct: null,
        freeze: false,
        answered: false,
        currentSection: 'section1'
    }),
    actions: {
        handleView() {
            //do some View stuff here
        },
        handleForm(payload) {
            this.formData = payload
        },
        handleOptionClick(event) {
            console.log(event.target.dataset.option == this.currentQuestion.correct)
            event.target.dataset.option == this.currentQuestion.correct
                ? this.handleAnswer(true)
                : (this.handleAnswer(false),
                    this.handleFreeze(true, 2500),
            setTimeout(() => this.handleResponse(true), 2000))
        },
        handleAnswer(val) {
            this.correct = val
            this.answered = true
            console.log( this.isCorrect)
        },
        handleResponse(val) {
            this.response = val
            this.answered = false  
        },
        handleFreeze(val, time) {
            this.freeze = val
            setTimeout(() => this.setFreeze(!val), time)
        },
        setFreeze(val) {
            this.freeze = val
        }
    },
    getters:{
        isIntro: (state) => state.intro,
        currentView: (state) =>state.view,
        introCopy: (state) => state.data.intro,
        formCopy: (state) => state.data.form,
        currentQuestion: (state) => state.data.questions[state.currentSection][1],
        currentOptions: (state) => state.data.questions[state.currentSection][1].options.slice(1),
        isResponse: (state) => state.response,
        isFreeze: (state) => state.freeze,
        isCorrect: (state) => state.correct,
        isAnswered: (state) => state.answered,
    }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}