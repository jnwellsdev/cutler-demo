import gsap from 'gsap'
// gsap.registerPlugin()

export const playSplash = () => {
    const all = '.top, .top2, .btm, .btm2'
    gsap.set('.mid, .mid .logo, .mid p, .mid button', {opacity: 0})
    gsap.set('.mid', {height: '0%'})
    gsap.set(all, {opacity: 0, scale: 0.8})

    const tl = gsap.timeline()
    tl.timeScale(1.5)

    tl.to('.top, .top2, .btm2, .btm', { opacity: 0.3, scale: 1, delay: 0.75,
      stagger: {
      grid: [1,4],
      each: 0.3
    }})
      .to(all, {opacity: 1, duration: 2}, '>')
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

export const playFadeForm = () => {

  const tl = gsap.timeline()
  tl.to('.form-module', {opacity: 0, duration: 0.5})
}
export const playFormExit = () => { 
  const tl = gsap.timeline()
  tl.to('.form-module', {x: '-100%', duration: 0.5}, '>')
    .to('.form-module', {opacity: 0, duration: 0})
}

export const playQuestion = () => {
  gsap.set('.question-screen section, .question-screen .modal', {opacity: 0})

  const tl = gsap.timeline()
  tl.to('.question-screen section', {opacity: 1, duration: 1, delay: 0.5})
      .to('.question-screen .modal', {opacity: 1, duration: 1}, '> +0.5')
}

export const playNext = () => { 
  const tl = gsap.timeline()
  tl.to('.question-screen .modal', {opacity: 0, duration: 0})
    .to('.question-screen .section-bg.first', {opacity: 0, duration: 0.5}, '> +0.5')
    .to('.question-screen .modal', {opacity: 1, duration: 0.5}, '> +1.5')
}

export const playVideo = () => {
  gsap.set('.video-screen .background, .video-screen section, .video-screen footer', {opacity: 0})

  const tl = gsap.timeline()
  tl.to('.video-screen .background', {opacity: 1, duration: 1, delay: 1})
      .to('.video-screen section', {opacity: 1, duration: 1}, '> -0.5')
      .to('.video-screen footer', {opacity: 1, duration: 1}, '> +1')
}

export const playNextVideo = () => { 
  const tl = gsap.timeline()
  tl.to('.question-screen section, .question-screen .modal, footer button', {opacity: 0, duration: 0})
    .to('.question-screen section', {opacity: 1, duration: 0.5}, '> +1')
    .to('.question-screen .modal, footer button', {opacity: 1, duration: 0.5}, '> +0.5')
}

export const playVideoResponse = () => { 
  gsap.set('.question-screen.video .response', {opacity: 0})

  const tl = gsap.timeline()
  tl.to('.question-screen.video', {opacity: 1, duration: 1, delay: 1})
      .to('.question-screen.video .response', {opacity: 1, duration: 1}, '> -0.5')
}

export const playVideoExit = () => { 
  const tl = gsap.timeline()
  tl.to('.video-screen header, .video-screen section, .video-screen footer', {opacity: 0, duration: 0.15})
    .to('.video-screen .background', {x: '-100%', duration: 0.5}, '>')
    .to('.video-screen .background', {opacity: 0, duration: 0})
}

export const playFade = () => { 
  const tl = gsap.timeline()
  tl.to('.question-screen .section-bg.first', {opacity: 1, duration: 0})
}

export const playResponse = () => { 
  const tl = gsap.timeline()
  tl.to('.question-screen .modal, footer button', {opacity: 0, duration: 0})
    .to('.question-screen .modal', {opacity: 1, duration: 1}, '>')
    .to('footer button', {opacity: 1, duration: 1}, '> +1.5')
}

export const playBumper = () => { 
  const tl = gsap.timeline()
    .to('.video-screen .background', {x: 0, duration: 0})
    .to('.video-screen .background', {opacity: 1, duration: 0.5}, '0.5')
    .to('.video-screen header', {opacity: 1, duration: 0.5})
    .to('.video-screen footer', {opacity: 1, duration: 0.5}, '> +4')
}
