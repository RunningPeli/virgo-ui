<script lang="ts" setup>
import { ref } from 'vue';

const showFade = ref(false)
</script>

# Transitions

## Introduction


Virgo offers valuable transitions for your application, both for external use and internally. You can apply most of these transitions to various components within your application.

Moreover, you have the option to create your own transitions using the createTransition function provided by Virgo.

Transitions components in Virgo follow a pattern of `Virgo<transition-name>Transition` (e.g., `VirgoFadeTransition`).
The transition name serves as the identifier for the transition. For instance, if you create a transition component
for bouncing effects using `createTransition('bounce')`, name it `VirgoBounceTransition`, and utilize it as `<SomeComponent transition="bounce">`.
Remember to define the necessary styles for this transition.

## Naming Convention

Transition names are adopted from [Vuetify](https://vuetifyjs.com/en/styles/transitions/) because they offer ideal names that are also compatible
with [logical directions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties).

However, it's important to note that these transitions differ from Vuetify's in terms of implementation and behavior.
This distinction arises because we followed graph directions to implement these transitions.

<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 21h17v-2H5V3H3v17a1 1 0 0 0 1 1z"/></svg>

Y <i class="i-bx-up-arrow-alt"></i>

X <i class="i-bx-right-arrow-alt"></i>

In the above graph, transitioning in the Y direction requires moving upwards.
Therefore, our Slide Y & Scroll Y transitions commence from the bottom and move upwards.
Similarly, transitioning in the X direction involves moving to the right. Hence, our Slide X & Scroll X transitions
originate from the left and move towards the right.

### Demo

<br>

<demo src="../../components/demos/features/transition/demo-features-transition-demo.vue" ></demo>


## Customizing Transitions

You can customize the transition duration and timing using CSS variables.

To adjust the duration of the fade transition, override the `--fade-opacity-duration` CSS variable. Similarly, to modify the timing function, override the `--fade-opacity-timing` CSS variable.

If a transition involves multiple properties, you can override the corresponding CSS variables in the format `--<transition-name>-<property>-duration` and `--<transition-name>-<property>-timing`. For instance, for the `slide-x` transition, override `--slide-x-transform-duration` and `--slide-x-transform-timing` CSS variables.

Additionally, for transitions like `slide-x`, you can change the transitioning value using the `--slide-x-transform-translateX` CSS variable.

<br>

<demo src="../../components/demos/features/transition/demo-features-transition-customizing-transition.vue"></demo>

If you noticed, the Tooltip now begins its animation from the bottom 14px (_increased_) instead of the default 8px, achieved via the `[--slide-y-translateY:14px]` class.

Feel free to experiment with the transitions and customize them to your preference. <i class="i-fluent-emoji-smiling-face-with-sunglasses"></i>

## Creating Custom Transition Components

Virgo offers the `createTransition` composable for generating custom transition components that can be reused.
This composable accepts a transition name as a parameter and outputs a transition component.

```ts
import { createTransition } from '@virgo-ui/vue'

export const VirgoFadeTransition = createTransition('fade')
```

Now, you have a transition component, but you need to define the styles for it.
You can define the styles for your transition component in the same manner as you would for any other transition.

Here's an example of fade transition styles used in Virgo:

<<< @/../packages/virgo-vue/src/scss/index.scss#fade-transition
