// https://nuxt.com/docs/api/configuration/nuxt-config
import ViteYaml from '@modyfi/vite-plugin-yaml'
import pugPlugin from "vite-plugin-pug"
import path from 'path'

const options = { pretty: true }
const locals = { name: "My Pug" }
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-16',
            viewport: 'initial-scale=1',
            title: 'Cutler Salons Demo',
            meta: [
                // <meta name="description" content="My amazing site">
                { name: 'description', content: 'How well do you know Cutler Salons?' }
            ],
            link: [
              { rel: 'icon', type: 'image/x-icon', href: process.env.NODE_ENV === 'production' ? '/favicon.png' : '/favicon.png' }
            ],
            script: [
                { src: process.env.NODE_ENV === 'production' ? '/player.js' : '/player.js' }
            ]
        },
        baseURL: process.env.NODE_ENV === 'production' ? '/' : '/',
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
    ],
    vite: {

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
    nitro: {
        output: {
          publicDir: path.join(__dirname, 'dist')
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
