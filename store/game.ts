import { defineStore, acceptHMRUpdate } from 'pinia'
import data from '~/content/index.yml'

export const useGameStore = defineStore({
	id: 'game-store',
    state: () => ({
        csrf: Object,
		data: data,
        view: 'splash',
		score: 0,
		section: 1,
		question: 1,
		correct: false,
		response: false,
		video: 1,
		bumper: false,
		videoResponse: false,
		intro: false,
		animate: '',
		freeze: false,
		form: false,
		formResponse: false,
		formData: {
            first_name: '',
			last_name: '',
			email: '',
            score: '',
            salon: ''
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
						    this.animate = 'video',
							this.handleFreeze(true, 4500) )
					break
				case 'video':
					this.intro === false
						? ( this.intro = true, this.animate = 'videoExit',
							this.handleFreeze(true, 6000))
						: ( this.handleView('questions'),
							this.animate = 'question',
							this.handleFreeze(true, 3000))
					break
				case 'questions':
					this.section === 1 ? this.animate = 'next' : this.animate = 'nextVideo'
					this.handleResponse(false)
					this.handleFreeze(true, 4500)
					break
			}
		},
		handleView(val: string) {
			this.view = val
		},
        handleForm() {
            this.formResponse = this.formCopy.response
			setTimeout(() => {
				this.form = false,
				this.handleView('video'),
				this.animate = 'video',
				this.handleFreeze(true, 4500)
			}, 1000)
            // this.addUser()           
        },
        async getCSRF() {
            await $fetch('http://localhost:8000/sanctum/csrf-cookie').then((res) => {
               console.table(res)
          })  
        },
        async addUser() {
            await $fetch('http://localhost:8000/cutler', {
                method: 'POST',
                header: {
                   'X-XSRF-TOKEN': this.csrf  
                },
                body: this.formData,
                mode: 'cors',
                credentials: 'include',

            }).then(() => {
                this.formResponse = this.formCopy.response
            });
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
					this.handleFreeze(true, 3750),
					setTimeout(() => {
						this.section === 1 ? (this.animate = 'response') : (this.animate = 'videoResponse')
						this.handleResponse(true)
					}, 1500)
		},
		handleUrl() {
			window.open("https://www.cutlersalon.com", "_blank")
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
			this.question === 7 && this.section === 1
				? (this.section = 2, this.question = 0, this.question++, this.view = 'video', this.animate = 'video')
				: this.question === 7 && this.section === 2
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
		handleIntro() {
			this.intro = !this.intro
		},
		handleVideo() {
			console.log('handleVideo')
			this.video++
		},
		handleBumper() {
			this.bumper = !this.bumper
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
		currentVideo: (state) => state.video,
		isResponse: (state) => state.response,
		isVideoResponse: (state) => state.videoResponse,
		isintro: (state) => state.intro,
		isFreeze: (state) => state.freeze,
		isCorrect: (state) => state.correct,
		isScore: (state) => state.score,
		bg1: (state) => (
			process.env.NODE_ENV === 'production'
				? {background: `url(public/img/cut-bg-${state.section === 1 ? state.question : state.question + 8}.jpg)`,backgroundSize: 'cover', backgroundPosition: '45% 50%'}
				: {background: `url(img/cut-bg-${state.section === 1 ? state.question : state.question + 8}.jpg)`,backgroundSize: 'cover', backgroundPosition: '45% 50%'}
			),
		bg2: (state) => (
			process.env.NODE_ENV === 'production'
				? {background: `url(public/img/cut-bg-${state.section === 1 ? state.question + 1 : state.question + 8}.jpg)`, backgroundSize: 'cover', backgroundPosition: '45% 50%'}
				: {background: `url(img/cut-bg-${state.section === 1 ? state.question + 1 : state.question + 8}.jpg)`, backgroundSize: 'cover', backgroundPosition: '45% 50%'}
			),
		bg3: (state) => (
			process.env.NODE_ENV === 'production'
				? {background: 'url(public/img/cut-bg-1.jpg)', backgroundSize: 'cover', backgroundPosition: '45% 50%'}
				: {background: 'url(img/cut-bg-1.jpg)', backgroundSize: 'cover', backgroundPosition: '50%'}
			)
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}
