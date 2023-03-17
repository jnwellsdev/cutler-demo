import gsap from 'gsap'
// gsap.registerPlugin()

export const playSplash = () => {
    const all = '.top, .top2, .btm, .btm2'
    gsap.set('.mid, .top, .top2, .btm, .btm2, .mid .logo, .mid p, .mid button', {opacity: 0})
    gsap.set('.mid', {height: '0%'})

    const tl = gsap.timeline()
    tl.timeScale(1.5)

    tl.to('.top', {opacity: 0.5, duration: 1, delay: 1, ease: 'sine'})
      .to('.top2', {opacity: 0.5, duration: 1, ease: 'sine'}, '> -0.25')
      .to('.btm2', {opacity: 0.5, duration: 1, ease: 'sine'}, '> -0.25')
      .to('.btm', {opacity: 0.5, duration: 1, ease: 'sine'}, '> -0.25')
      .to(all, {opacity: 1, duration: 3}, '>')
      .to('.mid', {opacity: 1, height: '100%', duration: 1, ease: 'circ.inOut'}, '> -1' )
      .to('.mid button, .mid p', {opacity: 1, duration: 0.5, ease: 'circ.inOut'}, '> -0.25')
      .to('.mid .logo', {opacity: 1, duration: 0.5, ease: 'circ.in'}, '> +0.25' )
    // console.log(gsap)
}

export const playForm = () => {
    gsap.set('.title', {opacity: 0})
    gsap.set('.form-module', {opacity: 0, x: '-50%'})

    const tl = gsap.timeline()
    tl.to('.mid .logo, .mid p, .mid button', {opacity: 0, duration: 0.5})
        .to('.title', {opacity: 1, duration: 1}, '<')
        .to('.form-module', {opacity: 1, x: 0, duration: 0.5}, '<')
}

export const playVideo = () => {
  console.log('ok3')
    gsap.set('.video-screen .background, .video-screen span', {opacity: 0})

    const tl = gsap.timeline()
    tl.to('.video-screen .background', {opacity: 1, duration: 1, delay: 1})
        .to('.video-screen span', {opacity: 1, duration: 1}, '>')
}

export const playQuestion = () => {
  gsap.set('.question-screen section, .question-screen .modal', {opacity: 0})

  const tl = gsap.timeline()
  tl.to('.question-screen section', {opacity: 1, duration: 1, delay: 0.5})
      .to('.question-screen .modal', {opacity: 1, duration: 1}, '> -0.5')
}

export const playNext = () => { 
  const tl = gsap.timeline()
  tl.to('.question-screen .modal', {opacity: 0, duration: 0})
    .to('.question-screen .section-bg.first', {opacity: 0, duration: 0.5}, '> +0.5')
    .to('.question-screen .section-bg.first', {opacity: 1, duration: 0})
    .to('.question-screen .modal', {opacity: 1, duration: 0.5}, '> +0.5')
}

export const playResponse = () => { 
  console.log('ok1')
  const tl = gsap.timeline()
  tl.to('.question-screen .modal, footer button', {opacity: 0, duration: 0})
    .to('.question-screen .modal, footer button', {opacity: 1, duration: 0.25}, '> +0.25')
}

export const playNextVideo = () => { 
  const tl = gsap.timeline()
  tl.to('.question-screen section, .question-screen .modal, footer button', {opacity: 0, duration: 0})
    .to('.question-screen section', {opacity: 1, duration: 0.5}, '> +1')
    .to('.question-screen .modal, footer button', {opacity: 1, duration: 0.5}, '> +0.5')
}

export const playVideoResponse = () => { 
  console.log('ok2')
  gsap.set('.question-screen.video .video-bg, .question-screen.video .response', {opacity: 0})

  const tl = gsap.timeline()
  tl.to('.question-screen.video .video-bg', {opacity: 1, duration: 1, delay: 1})
      .to('.question-screen.video .response', {opacity: 1, duration: 1}, '> -0.5')
}