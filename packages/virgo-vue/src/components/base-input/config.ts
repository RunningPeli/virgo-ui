import type { ComponentClasses } from '@/plugin'
import type { baseInputProps } from '@/components/base-input/meta'

/*
inputWrapper: 'virgo-base-input-input-wrapper transition duration-250 ease-out flex i:w-5 i:h-5 [&_>_.virgo-spinner]-w-5 h-10 rounded-lg cursor-text px-4 spacing:gap-x-2 relative i:focus-within:text-primary items-center border border-solid border-a-border w-full',
	inputWrapperError: 'border-red-500',
	inputWrapperValid: 'focus-within:border-primary',
	prependInnerIcon: 'z-1',
	appendInnerIcon: 'ms-auto',


	inputChild: 'virgo-base-input-child w-full h-full inset-0 rounded-inherit bg-transparent',
	inputChildWithPrependInner: '',
	inputChildWithAppendInner: '',
	inputChildWithoutPrependInner: '',
	inputChildWithoutAppendInner: '',
	messageContainer: 'h-8', // hint and errors
	messageError: 'text-red-500',
	messageHint: 'text-light-emphasis'
 */
export const baseInputClasses: ComponentClasses<baseInputProps> = {
	root: ({ disabled, readonly }) => {
		return [
			'virgo-base-input-root i:children:focus-within:text-primary flex flex-col flex-grow flex-shrink-0 gap-y-1',
			{
				'!all-[.virgo-base-input-input-wrapper]-bg-[hsla(var(--virgo-base-c),0.12)] opacity-50': disabled,
				'pointer-events-none': disabled || readonly,
				'all-[.virgo-base-input-child]-placeholder:transition all-[.virgo-base-input-child]-placeholder:duration-250 all-[.virgo-base-input-child]-placeholder:ease all-[.virgo-base-input-child:focus]-placeholder-translate-x-1': !(disabled || readonly)
			}
		]
	},
	label: ({ error }) => {
		return [
			'virgo-base-input-label',
			{
				'text-red-500': error
			}
		]
	},
	inputContainer: 'virgo-base-input-input-container flex items-center i:w-6 i:h-6 gap-x-3',
	inputWrapper: ({ error }) => {
		return [
			'virgo-base-input-input-wrapper transition duration-250 ease-out flex i:w-5 i:h-5 [&_>_.virgo-spinner]-w-5 h-10 rounded-lg cursor-text px-4 spacing:gap-x-2 relative i:focus-within:text-primary items-center border border-solid border-a-border w-full',
			error ? 'border-red-500' : 'focus-within:border-purple-500'

		]
	},
	inputChild: ({ slots, prependInnerIcon, appendInnerIcon }) => {
		return [
			'virgo-base-input-child w-full h-full  inset-0 rounded-inherit bg-transparent',
			slots?.['prepend-inner'] || prependInnerIcon
				? 'has-prepend-inner'
				: 'has-no-prepend-inner',
			slots?.['append-inner'] || appendInnerIcon
				? 'has-append-inner'
				: 'has-no-append-inner'
		]
	}
}

export type baseInputClassesValidKeys = keyof typeof baseInputClasses
