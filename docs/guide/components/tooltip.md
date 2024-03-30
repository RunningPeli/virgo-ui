<script lang="ts" setup>
import tooltipApi from '@virgo-ui/vue/component-meta/tooltip.json';
</script>

# Tooltip <new-badge/>

## Default Classes

<<< @/../packages/virgo-vue/src/components/tooltip/config.ts

## Basic

Use `tooltip` component's `text` prop to show passed text in tooltip.

You can also use `default` slot to render custom content.

<demo src="../../components/demos/tooltip/demo-tooltip-basic.vue"></demo>

:::tip
While rendering custom content, You can use `.virgo-tooltip-text` class to add default styles of tooltip text.
:::


## Trigger

To open menu on click use set `trigger` prop to `click`.

<demo src="../../components/demos/tooltip/demo-tooltip-trigger.vue"></demo>


## v-model support

`tooltip` also support `v-model` to show/hide tooltip.

<demo src="../../components/demos/tooltip/demo-tooltip-v-model-support.vue"></demo>

## Delay

You can delay showing and hiding of tooltip by setting `delay` (_show delay_) and `hideDelay` props.

<demo src="../../components/demos/tooltip/demo-tooltip-delay.vue"></demo>

:::tip `delay` - DX focused prop name
As we regularly configure delay for showing tooltip only and not for hiding, we named prop for delaying tooltip `delay` instead of `showDelay`.
:::

## Transition

`tooltip` also support transition. Default transition is `slide-y`. Set it to available transition to use different transition. e.g. `transition="fade"`.

To disable the transition you can set `transition` prop to `null`.

<demo src="../../components/demos/tooltip/demo-tooltip-transition.vue"></demo>

## Placement

As `tooltip` uses [Floating UI](https://floating-ui.com/), you can configure how tooltip is rendered.

To adjust the placement of tooltip, use `placement` prop. This will get directly passed to Floating UI as show in their [docs](https://floating-ui.com/docs/computePosition#placement).

<demo src="../../components/demos/tooltip/demo-tooltip-placement.vue"></demo>

:::tip ✨ Auto Placement
If there's not enough space to render the tooltip on given position then it will update the position according to available space.
:::

## Strategy

Set which positioning strategy to use to render the tooltip. This is also Floating UI option, for more details please read the official docs [here](https://floating-ui.com/docs/computeposition#strategy).

<demo src="../../components/demos/tooltip/demo-tooltip-strategy.vue"></demo>


## Middleware

`tooltip` has some middleware as default to render the tooltip content correctly. You can also customize the middleware you want.

In below demo we are not using any middleware so tooltip component won't behave like above tooltip contents. e.g. Flipping tooltip content if there's not enough space won't work.

`middleware` prop accepts function that must return array of middleware. Please refer to the code snippet of this demo for function signature.

You can read more about middleware on their official [docs](https://floating-ui.com/docs/computePosition#middleware).

<demo src="../../components/demos/tooltip/demo-tooltip-middleware.vue"></demo>

## API

<api title="Tooltip" :api="tooltipApi"></Api>
