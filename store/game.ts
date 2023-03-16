import { defineStore, acceptHMRUpdate } from 'pinia'
import data from '~/content/index.yml'

export const useGameStore = defineStore({
	id: 'game-store',
	state: () => ({
		data: data,
		view: 'splash',
		animate: '',
		question: 1,
		response: false,
		correct: false,
		freeze: false,
		answered: false,
		currentSection: 'section1',
		form: false,
		formData: {
			first_name: '',
			last_name: '',
			email: '',
			score: '',
		},
		formResponse: false,
	}),
	actions: {
		handleNext() {
			switch (this.view) {
				case 'splash':
					!this.form
						? ( this.form = true,
							this.animate = 'form' )
						: ( this.form = false,
							this.handleView('video'),
						    this.animate = 'video' )
					break
				case 'video':
					this.handleView('questions')
					break
				case 'questions':
					this.handleQuestion()
					this.handleResponse(false)
					this.handleView('questions')
					break
			}
		},
		handleView(val: string) {
			this.view = val
		},
		handleForm(payload: {
			first_name: string,
			last_name: string,
			email: string,
			score: string
		}) {
			this.formData = payload
			this.formResponse = this.formCopy.response
		},
		handleOptionClick(event: {
			target: { dataset: { option: any } },
			currentTarget: { classList: { add: (arg0: string) => any } }
		}) {
			console.log(event.target.dataset.option == this.currentQuestion.correct),
				event.target.dataset.option == this.currentQuestion.correct ? (this.handleAnswer(true), event.currentTarget.classList.add('correct')) : (this.handleAnswer(false), event.currentTarget.classList.add('incorrect')),
				this.handleFreeze(true, 2500),
				setTimeout(() => this.handleResponse(true), 2000)
		},
		handleAnswer(val: boolean) {
			this.correct = val
		},
		handleResponse(val: boolean) {
			this.response = val
		},
		handleQuestion() {
			this.question++
		},
		handleFreeze(val: boolean, time: number | undefined) {
			this.freeze = val
			setTimeout(() => this.setFreeze(!val), time)
		},
		handleAnimate(val: string) {
			this.animate = val
		},
		setFreeze(val: boolean) {
			this.freeze = val
		},
	},
	getters: {
		isForm: (state) => state.form,
		currentView: (state) => state.view,
		currentAnimate: (state) => state.animate,
		isQuestion:  (state) => state.question,
		introCopy: (state) => state.data.intro,
		formCopy: (state) => state.data.form,
		currentQuestion: (state) => state.data.questions[state.currentSection][state.question],
		isResponse: (state) => state.response,
		isFreeze: (state) => state.freeze,
		isCorrect: (state) => state.correct,
		isAnswered: (state) => state.answered,
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}
