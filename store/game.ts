import { defineStore, acceptHMRUpdate } from 'pinia'
import data from '~/content/index.yml'

export const useGameStore = defineStore({
	id: 'game-store',
	state: () => ({
		data: data,
		view: 'splash',
		score: 0,
		section: 1,
		question: 1,
		correct: false,
		response: false,
		videoResponse: false,
		animate: '',
		freeze: false,
		form: false,
		formResponse: false,
		formData: {
			first_name: '',
			last_name: '',
			email: '',
			score: '',
		},
	}),
	actions: {
		handleNext() {
			switch (this.view) {
				case 'splash':
					!this.form
						? ( this.form = true,
							this.animate = 'form')
						: ( this.form = false,
							this.handleView('video'),
						    this.animate = 'video' )
					break
				case 'video':
					this.handleView('questions')
					this.animate = 'question'
					break
				case 'questions':
					this.section === 1 ? this.animate = 'next' : this.animate = 'nextVideo'
					this.handleResponse(false)
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
			currentTarget: { classList: { add: (arg0: string) => any } 
}
		}) {
			console.log(event.target.dataset.option == this.currentQuestion.correct),
			event.target.dataset.option == this.currentQuestion.correct
				? ( this.handleAnswer(true), event.currentTarget.classList.add('correct') )
				: ( this.handleAnswer(false), event.currentTarget.classList.add('incorrect') ),
					this.handleFreeze(true, 2000),
					setTimeout(() => {
						this.section === 1 ? (this.animate = 'response') : (this.animate = 'videoResponse')
						this.handleResponse(true)
					}, 1500)
		},
		handleAnswer(val: boolean) {
			this.correct = val
			val && this.score++
		},
		handleResponse(val: boolean) {
			this.section === 1
				? this.response = val
				: this.videoResponse = val
		},
		handleQuestion() {
			this.question === 7
				? (this.section = 2, this.question = 0, this.question++, this.view = 'video', this.animate = 'video')
				: this.question === 14
				? (this.view = 'outro')
				: this.question++
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
        preloadImages(val: any[]) {
            let dir = process.env.NODE_ENV === 'production' ? 'public/img/' : 'img/'
            let imgs: any[] = []
            val.forEach(img => (imgs = [...imgs, `${dir}${img}`]))
            imgs.forEach(path => (new Image().src = path))
        }
	},
	getters: {
		isForm: (state) => state.form,
		currentView: (state) => state.view,
		currentAnimate: (state) => state.animate,
		isQuestion:  (state) => state.question,
		introCopy: (state) => state.data.intro,
		outroCopy: (state) => state.data.results,
		formCopy: (state) => state.data.form,
		currentQuestion: (state) => state.data.questions[`section${state.section}`][state.question],
		currentSection: (state) => state.section,
		isResponse: (state) => state.response,
		isVideoResponse: (state) => state.videoResponse,
		isFreeze: (state) => state.freeze,
		isCorrect: (state) => state.correct,
		isScore: (state) => state.score,
		bg1: (state) => (
			process.env.NODE_ENV === 'production'
				? {background: `url(public/img/cut-bg-${state.question}.jpg)`,backgroundSize: 'cover', backgroundPosition: '45% 50%'}
				: {background: `url(img/cut-bg-${state.question}.jpg)`,backgroundSize: 'cover', backgroundPosition: '45% 50%'}
			),
		bg2: (state) => (
			process.env.NODE_ENV === 'production'
				? {background: `url(public/img/cut-bg-${state.question + 1}.jpg)`, backgroundSize: 'cover', backgroundPosition: '45% 50%'}
				: {background: `url(img/cut-bg-${state.question + 1}.jpg)`, backgroundSize: 'cover', backgroundPosition: '45% 50%'}
			)
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}
