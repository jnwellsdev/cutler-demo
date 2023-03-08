// https://nuxt.com/docs/api/configuration/nuxt-config
import ViteYaml from '@modyfi/vite-plugin-yaml';
import pugPlugin from "vite-plugin-pug"

const options = { pretty: true } 
const locals = { name: "My Pug" }
export default defineNuxtConfig({
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
