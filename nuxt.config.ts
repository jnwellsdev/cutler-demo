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
            link: [
              { rel: 'icon', type: 'image/x-icon', href: process.env.NODE_ENV === 'production' ? '/favicon.png' : '/favicon.png' }
            ],
            script: [
                { src: process.env.NODE_ENV === 'production' ? '/player.js' : '/player.js' }
            ]
        },
        baseURL: process.env.NODE_ENV === 'production' ? '/' : '/'
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@zadigetvoltaire/nuxt-gtm',
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
    gtm: {
        id: 'GTM-TXBVH3M', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
        defer: false, 
        compatibility: false, 
        nonce: '2726c7f26c', 
        enabled: true, 
        debug: true,
        loadScript: true, 
        enableRouterSync: true, 
        trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
        devtools: true, 
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
