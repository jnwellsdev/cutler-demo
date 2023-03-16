<template lang='pug'>
.background-module
</template>

<style lang='sass' scoped>
.background-module
    position: absolute
    width: 101%
    height: 101%
    z-index: 0
    left: -0.5%
    top: -0.5%
    & > *
        position: absolute
        width: 100%
        height: 100%
        background-size: cover
        background-position: 50% 80%
    .disclaim
        height: auto
        width: 66%
        margin: 0 17%
        bottom: 20px
        z-index: 1000
        color: #a4cd75
        text-shadow: 0 0 20px rgb(34 34 34 / 40%)
        font-weight: 200
        font-size: 0.9rem
        padding: 0 3vw
        text-align: center
    .bg-main
        background-image: url(~/img/bg.jpg)
    .bg-game
        background-image: url(~/img/bg-game.jpg)
        opacity: 0 //

@media only screen and (min-device-width: 320px) and (max-device-width: 920px) and (orientation: portrait)
    .background-module
        .disclaim
            width: 96%
            margin: 1rem 2%
        .bg-game
            background-size: 250%
            background-repeat: no-repeat
            background-position: 50% 0
            background-color: #00070d

</style>