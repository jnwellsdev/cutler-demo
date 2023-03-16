// https://nuxt.com/docs/api/configuration/nuxt-config
import ViteYaml from '@modyfi/vite-plugin-yaml';
import pugPlugin from "vite-plugin-pug"

const options = { pretty: true }
const locals = { name: "My Pug" }
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-16',
            viewport: 'initial-scale=1',
            title: 'Cutler Salons',
            meta: [
                // <meta name="description" content="My amazing site">
                { name: 'description', content: 'How well do you know Cutler Salons?' }
            ],
            script: [
                { src: '/player.js' }
            ]
        },
        baseURL: process.env.NODE_ENV === 'production' ? '/cutler/public' : '/'
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
    ],
    vite: {
        base: '/_nuxt/',

        plugins: [
            ViteYaml(),
            pugPlugin(options, locals),

        ],

        css: {
            preprocessorOptions: {
                sass: {
                    additionalData: '@use "~/assets/sass/index.sass" as *\n'
                }
            }
        },
        server: {
            watch: {
                usePolling: true
            }
        }
    },

    // pinia: {
    //     autoImports: [
    //     'defineStore', 
    //     ],
    // },
    tailwindcss: {
        // add '~tailwind.config` alias
        exposeConfig: true
    },

})
