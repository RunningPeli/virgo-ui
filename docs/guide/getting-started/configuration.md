# Configuration

## TypeScript

For those using TypeScript, the library offers a `defineVirgoConfig` function designed to provide type hints:

```ts
import {virgo, defineVirgoConfig } from '@virgo-ui/vue';
import { createApp } from 'vue';

const app = createApp(App);

app.use(
	virgo,
	defineVirgoConfig({
		classes: {
			VirgoButton: {
				// …
			}
		}
	})
)
```

## Dedicated Config File <coming-badge/>

Define your Virgo configuration within a dedicated file, `virgo.config.ts`, located at the root of your project. Virgo automatically recognizes this file.

```ts
import { defineVirgoConfig } from '@virgo-ui/vue';

export default defineVirgoConfig({
	classes: {
		VirgoButton: {
			// …
		},
	},
});
```

## Available options

```ts
interface PluginOptions {
	registerComponents: boolean
	classes: PartialDeep<ComponentsClasses>
	componentAliases: Record<string, any>
	defaultProps: PartialDeep<PluginOptionDefaults>
	baseZIndex: number
}
```

- `registerComponents` - Registers all components globally. The default setting is `true`.
- `classes` - Allows customization of component classes. Detailed configurations for each component are available on their pages, under the Default Classes section.
- `componentAliases` - Enables the registration of component aliases. The default is an empty object `{}`.
- `defaultProps` - Establishes default properties for components. The list of properties for each component can be found on their specific pages, under the API section. The default is an empty object `{}`.
- `baseZIndex` - Specifies the base z-index for components, with a default value of `2000`.

## Default Props

Components from libraries come with predefined default props tailored to general usage. For instance, the `color` prop is typically set to `primary` to align with the most frequently used color in applications.

But what about less apparent props, such as `size`? If your design system demands components that are smaller than those offered by the library, you might find yourself specifying the `size` prop repeatedly across your application.

```vue
<template>
  <virgo-button size="sm">Submit</virgo-button>

  <virgo-button size="sm">Preview</virgo-button>

  <virgo-button size="sm">Download</virgo-button>
</template>
```
This necessitates the repeated use of the `size` prop across your project, which can be quite inconvenient and comes with several drawbacks (though we won't delve into those here).

### The Solution?

Imagine a solution that allows us to set default prop values for all components from a library. This would be incredibly convenient, eliminating the need to specify the same props repeatedly.

Virgo offers just that — the ability to configure default props for all components during the plugin registration process.

```ts
// ℹ️ Virgo don't have `size` prop. This is just an example.
createApp(App)
  .use(virgo, {
    defaultProps: {
      VirgoButton: {
        size: 'sm',
      },
    }
  })
```

Now, you can craft your components without the need to repeatedly declare the `size` prop, keeping your code DRY (Don't Repeat Yourself).

```vue
<template>
  <virgo-button>Submit</virgo-button>

  <virgo-button>Preview</virgo-button>

  <virgo-button>Download</virgo-button>
</template>
```

With `defaultProps`, you can establish default prop values for any component within Virgo.

### Nested Default Props

The intricacies of design often demand different appearances for components based on their context.
For example, a `card` component might require a `virgo-button` of a specific `size`, while elsewhere,
the standard variant of a `virgo-button` suffices. This situation reintroduces a known challenge: the repetitive
specification of the `size` property within every `card` component.

```vue
<template>
  <card>
    <p>You're running out of storage!</p>
    <virgo-button size="sm" class="ms-auto">Upgrade</virgo-button>
  </card>

  <card>
    <p>Critical error occurred!</p>
    <virgo-button size="sm" class="ms-auto">Check</virgo-button>
  </card>

  <card>
    <p>Payment failed!</p>
    <virgo-button size="sm" class="ms-auto">Retry</virgo-button>
  </card>
</template>
```

Virgo further accommodates nested default props, enabling you to define default properties for a component within another component.

```ts
createApp(App)
  .use(virgo, {
    defaultProps: {
      Card: {
        VirgoButton: {
          size: 'sm',
        },
      },
    }
  })
```

Now, leveraging new default props, you can construct your components without the redundancy of
specifying the `size` prop, thereby maintaining DRY (Don't Repeat Yourself) principles in your code.

```vue
<template>
	<card>
		<p>You're running out of storage!</p>
		<virgo-button class="ms-auto">Upgrade</virgo-button>
	</card>

	<card>
		<p>Critical error occurred!</p>
		<virgo-button class="ms-auto">Check</virgo-button>
	</card>

	<card>
		<p>Payment failed!</p>
		<virgo-button class="ms-auto">Retry</virgo-button>
	</card>
</template>
```

Hold on, there's more. We've addressed prop redundancy, but we're still repeating the `class` attribute.

### Class, Style & Attrs Defaults

Beyond props, Virgo offers the ability to set default values for `class`, `style`, and `attrs` across all components.
With a dedicated configuration for classes, setting defaults for `class` results in a merge with this configuration.
These defaults can be accessed under the key `inheritedClass` in the `classList` from `useVirgo`.

```ts
createApp(App)
  .use(virgo, {
	  defaultProps: {
		  Card: {
			VirgoButton: {
			  size: 'sm',
			  class: 'ms-auto',
			  // style: {}, /* You can also set default styles */
			  // attrs: {}, /* Set default attrs, Just in case if needed */
			},
		  },
    },
  })
```

Finally, we've established a method to write our components without code repetition, effectively keeping our code DRY (Don't Repeat Yourself).

```vue
<template>
  <card>
    <p>You're running out of storage!</p>
    <virgo-button>Upgrade</virgo-button>
  </card>

  <card>
    <p>Critical error occurred!</p>
    <virgo-button>Check</virgo-button>
  </card>

  <card>
    <p>Payment failed!</p>
    <virgo-button>Retry</virgo-button>
  </card>
</template>
```

## Setting Defaults for Your Components

You're not limited to predefined components; you can also establish defaults for your custom components.
For instance, setting defaults for a custom `AppButton` component might look like this:

```ts
createApp(App)
	.use(virgo, {
		defaultProps: {
			AppButton: {
				class: 'uppercase',
			},
			AppCard: {
				AppButton: {
					propName: false,
				},
			}
		},
	})
```

Later in your component use `useVirgo` composable:

```vue
<script lang="ts" setup>
// other imports
import { useVirgo } from '@virgo-ui/vue'

// ❗ Make sure to use `_props` as name
const _props = defineProps<{}>() // or `withDefaults`

const { props, inlineStyle, attributes, classList } = useVirgo(_props)
// classList comes from plugin config 'classes'
// other code
</script>

<template>
  <div
    class="my-class"
    :class="classList.componentRoot"
    :style="[
      { color: 'red' },
      inlineStyle,
    ]"
    v-bind="attributes"
  >
    <!-- Your component content -->
    <!-- ❗ If you want to access props use `props.propName` -->
  </div>
</template>
```

:::warning
When employing the `useVirgo` composable, it's essential to access props using `props.propName` to ensure you're utilizing the plugin-configured properties.

This requirement applies even within your template, necessitating `props.propName` for prop access.
:::

# Component Aliases

There are scenarios where you might find yourself repeatedly using the same component from a library,
equipped with an identical set of props or attributes. For instance, you could be utilizing the `virgo-button`
component as an icon-only button, consistently across various parts of your application.

```vue
<template>
  <virgo-button
    icon="i-bx-cloud"
    icon-only
  />

  <virgo-button
    icon="i-bx-trash"
    icon-only
  />

  <virgo-button
    icon="i-bx-send"
    icon-only
  />
</template>
```

In such situations, relying on `defaultProps` may not be ideal, especially if you're using the same component throughout your application but don't require the identical set of props for every instance. For these scenarios, the `componentAliases` feature allows you to create aliases for components, tailoring their default props and attributes to fit specific use cases.

```ts
// Import the component you want to set alias for.
import { VirgoButton } from '@virgo-ui/vue'

createApp(App)
  .use(virgo, {
    componentAliases: {
      // Set alias for VirgoButton component
      MyIconButton: VirgoButton,
    },
    defaultProps: {
      // Set props defaults for IconBtn component
      MyIconButton: {
        iconOnly: true,
      },
    }
  })
```

Now, you can use the `MyIconButton` component throughout your application, and it will consistently carry the same set of props.

```vue
<template>
  <my-icon-button icon="i-bx-cloud" />

  <my-icon-button icon="i-bx-trash" />

  <my-icon-button icon="i-bx-send" />
</template>
```

:::info
Component aliases are registered globally, eliminating the need for individual imports.
:::

## Classes

### Styling Components

When it comes to styling, all components follow the same guidelines:

- You have the option to specify CSS classes globally for each component via the configuration.
- These classes can be either static or conditional, depending on the properties of the component.
- Classes set globally can be expanded upon or overridden at the local level.

::: tip NOTICE
The output of the classes configuration must adhere to the formats recognized
by [Vue's class binding](https://v3.vuejs.org/guide/class-and-style.html#binding-html-classes) mechanism: Array, Object, or String.
:::

Here are some examples of valid options.

### Static Classes

For instance, if you wish for all your buttons to include the `simple-button` class:

The documentation for each component, located on the component's page under the Default Classes section, will list all applicable classes.

To apply, simply use the component's name as the key in the `classes` configuration.


```ts
createApp(App)
  .use(virgo, {
	  classes: {
		  VirgoButton: {
			  button: 'simple-button',
		  }
	  }
  })
```

Now, every `VirgoButton` component will automatically receive `class="btn"`.

### Dynamic Classes

Continuing with our button example, suppose you want to add a `btn--disabled` class to the button when it is disabled.

The `button` key within your classes configuration can be a function. This function receives _all_ of the component instance's slots and props as an object, enabling conditional application of classes based on those props.

Below is an illustration of how to apply a dynamic class using the `VirgoButton`'s `disabled` property:

```ts
createApp(App)
  .use(virgo, {
	  classes: {
		  VirgoButton: {
			  button: ({ disabled, slots }) => {
					return [
						'simple-button',
						{
							'disabled-button': disabled,
						},
						slots?.['default'] ? 'default-slot-is-used' : 'default-slot-is-not-used',
						slots?.['icon'] ? 'icon-slot-is-used' : 'icon-slot-is-not-used'
					];
				}
		  }
	  }
  })
```
The outcomes are as follows:

- `<VirgoButton />` will produce `<button class="simple-button"></button>`.
- `<VirgoButton disabled />` will yield `<button class="simple-button btn--disabled"></button>`.

### Using Variants to Define Multiple Styles Globally

::: tip
The `variant` prop and the `bare` attribute are available across all components.
:::

Global class application streamlines your code by reducing repetition.
However, it's typical for a component to have various styles. Buttons are a classic example, often
featuring distinct _primary_ and _secondary_ designs.

The `variant` prop, available on every Virgo component, is designed specifically for this purpose.
It allows for conditional class application within the configuration, akin to how Vue handles class bindings:


```vue
<!-- No variant -->
<virgo-button>Label</virgo-button>

<!-- Single variant -->
<virgo-button variant="primary">Label</virgo-button>

<!-- Multiple variants separated by space -->
<virgo-button variant="primary large">Label</virgo-button>

<!-- Conditional variants (variable is a boolean) -->
<virgo-button :variant="['primary', { 'large': variable }]">Label</virgo-button>
```

The `variant` becomes accessible **as a normalized object** within the configuration, enabling the conditional application of classes:

```ts
createApp(App)
	.use(virgo, {
		classes: {
			VirgoButton: {
				button: ({ disabled, variant }) => {
					return [
						'simple-button',
						{
							'disabled-button': disabled,
							'large-button': variant?.large,
							'primary-button': variant?.primary
						}
					];
				}
			}
		}
	})
```

::: warning
For ease of conditionally applying classes in the configuration, the `variant` prop is processed and presented as an object of booleans within the class method. An example would be `{ primary: true, medium: true, large: false }`.

Should a `variant` not be specified, its value remains `undefined` and does not undergo transformation into an object.
:::
### Overriding Config

Should you require more granular control, **overriding the global classes** is possible by using the `bare` prop:

```vue
<virgo-button class="free-from-global-config-button" bare>Label</virgo-button>
```

This results in the component rendering with only the locally defined classes:

```vue
<button class="free-from-global-config-button">Label</button>
```

