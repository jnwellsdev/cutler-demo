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
        currentSection: 'section1',
        formResponse:null
    }),
    actions: {
        handleNext() {
            console.log(this.view)
            switch(this.view){
                case 'intro':
                    this.handleView('form')
                    break;
                case 'form':
                    this.handleView('video')
                    break;
            }
        },
        handleView(val) {
          this.view = val
        },
        handleForm(payload) {
            this.formData = payload
            this.formResponse = this.formCopy.response
        },
        handleOptionClick(event) {
            console.log(event.target.dataset.option == this.currentQuestion.correct),
            event.target.dataset.option == this.currentQuestion.correct
                ? (this.handleAnswer(true), event.currentTarget.classList.add('correct'))
                : (this.handleAnswer(false), event.currentTarget.classList.add('incorrect')),
            this.handleFreeze(true, 2500),
            setTimeout(() => this.handleResponse(true), 2000)
        },
        handleAnswer(val) {
            this.correct = val
        },
        handleResponse(val) {
            this.response = val
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