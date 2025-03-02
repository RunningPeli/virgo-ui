# Installation


1. To add Virgo UI to your project, use one of the following commands:

   ::: code-group

      ```bash [pnpm]
   pnpm add @virgo-ui/vue
      ```

      ```bash [yarn]
   yarn add @virgo-ui/vue
      ```

      ```bash [npm]
   npm install @virgo-ui/vue
      ```

   :::

2. Next, integrate Virgo into your `main.ts` as demonstrated below:

    ```js{3,5-6,8,10}
    import { createApp } from 'vue'
    import App from './App.vue'
    import { virgo } from '@virgo-ui/vue'

    // Imports virgo styles, which include only transitions and a scroll-lock style
    import '@virgo-ui/vue/dist/style.css'

    // Applying `app.use(virgo)` to register the Virgo plugin
    createApp(App).use(virgo).mount('#app')
    ```

You're now ready to incorporate Virgo components within your Vue files:

```vue
<template>
    <virgo-button>
        <tooltip text="Hello!" />
        Hover Over Me
    </virgo-button>
</template>
```

::: info NOTE
Explore the default designs on the Themes page. Also, ensure to review the [theme documentation](/guide/features/theme.md) for comprehensive insights on themes. Note that this installation process doesn't include the specific configuration and designs presented in the documentation, meaning the components will remain unstyled.
:::

<em class="block mt-12 mb-10">Understanding the preference to not globally register components, here are alternative approaches:</em>

### Tree Shaking

Opt for an À la carte approach if global registration doesn't suit your project's needs.

1. Disable global registration of components by setting the `registerComponents` option to `false` when initializing the Virgo plugin.

    ```diff
      import { virgo } from '@virgo-ui/vue'

      createApp(App)
    -   .use(virgo)
    +   .use(virgo, { registerComponents: false })
        .mount('#app')
    ```

2. Subsequently, import the components you need individually from `@virgo-ui/vue`.

    ```vue
    <script setup>
    import { Tooltip } from '@virgo-ui/vue'
    </script>

    <template>
      <virgo-button>
         <tooltip text="Hello!" />
         Hover Over Me
      </virgo-button>
    </template>
    ```

### Auto Importing Components with Tree Shaking

[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) facilitates the automatic, on-demand import of components, allowing you to skip explicit import statements while still benefiting from tree shaking.

1. First, ensure the `registerComponents` option is set to `false` in your `main.ts` if not already done.

    ```diff
      import { virgo } from '@virgo-ui/vue'

      createApp(App)
    -   .use(virgo)
    +   .use(virgo, { registerComponents: false })
        .mount('#app')
    ```

2. Proceed to install `unplugin-vue-components`:

   ::: code-group

      ```bash [pnpm]
      pnpm add -D unplugin-vue-components
      ```

      ```bash [yarn]
         yarn add -D unplugin-vue-components
      ```

      ```bash [npm]
       npm install --save-dev unplugin-vue-components
     ```

   :::

3. Configure `unplugin-vue-components` in your `vite.config.ts`:

    ```js
    // additional imports
    import Components from 'unplugin-vue-components/vite'
    import { VirgoResolver } from '@virgo-ui/vue'

    export default defineConfig({
      plugins: [
        // other plugins
        Components({
          resolvers: [
            VirgoResolver()
          ]
        }),
      ],
      // additional configurations
    })
    ```

4. Components can now be used directly in templates and will be automatically imported as needed.

    ```vue
    <template>
      <virgo-button>
         <tooltip text="Hello!" />
       Hover Over Me
      </virgo-button>
    </template>
    ```

## Volar Support

For projects utilizing [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar), global component types can be specified by adding the following configuration to your [`jsconfig.json`](https://code.visualstudio.com/docs/languages/jsconfig) or `tsconfig.json` for TypeScript projects:

```json
{
  "compilerOptions": {
    // other options...
    "types": ["@virgo-ui/vue/volar"]
  }
}
```

If you have a typescript project, you will have to configure the above in the `tsconfig.json` file.
