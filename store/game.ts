import { defineStore, acceptHMRUpdate } from 'pinia'
import data from '~/content/index.yml'

export const useGameStore = defineStore({
    id: 'game-store',
    state: () => ({
        colors: ['green', 'pink', 'white', 'red'],
        colorIndex: 0,
        counter: 0,
        testText: 'Monkey',
        data: data,
        view: 'intro',
        intro: true,
    }),
    actions: {
        handleView() {
            console.log('test monkey')
        },
        incrementCounter() {
            this.counter++
        },
        changeColor() {
            this.colorIndex++
            this.colorIndex > 3 ? this.colorIndex = 0 : null
        }
    },
    getters:{
        getCounter: (state) => state.counter,
        introCopy: (state) => state.data.intro,
        currentView: (state) =>state.view,
        isIntro: (state) => state.intro
    }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}