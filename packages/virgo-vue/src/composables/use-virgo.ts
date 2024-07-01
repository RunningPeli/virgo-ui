import { objectKeys, objectPick } from '@antfu/utils'
import { deepmergeCustom } from 'deepmerge-ts'
import type { Ref, StyleValue, VNodeNormalizedChildren } from 'vue'
import { normalizeClass, toValue } from 'vue'
import { VIRGO_CLASSES, VIRGO_DEFAULT_PROPS } from '@/symbols'
import type { PluginOptionDefaults } from '@/plugin-defaults'
import type { PluginOptions, ToNormalizedVariant } from '@/plugin'

export const mergeDefaultProps = deepmergeCustom({
	mergeArrays: false
})

interface ReturnType<Props> {
	props: Props
	classList: Ref<Record<string, string> | undefined | any>
	inlineStyle: Ref<StyleValue | undefined>
	attributes: Ref<Record<string, unknown> | undefined>
}

export function useVirgo<Props extends Record<string, unknown>>(definitionProps: Props, componentName?: keyof PluginOptionDefaults): ReturnType<Props> {
	const vm = getCurrentInstance()
	const _componentName = (componentName ?? vm?.type.name ?? vm?.type.__name) as keyof PluginOptionDefaults | undefined

	if (!_componentName) throw new Error('Unable to identify the component name. Please define component name or use the `componentName` parameter while using `useVirgo` composable.')

	const defaultProps = inject(VIRGO_DEFAULT_PROPS, {})
	const newDefaultProps = ref({}) as Ref<PluginOptions['defaultProps']>

	provide(VIRGO_DEFAULT_PROPS, newDefaultProps)

	// Return Values
	const propsRef = ref() as Ref<ReturnType<Props>['props']>
	const inlineStyle = ref() as ReturnType<Props>['inlineStyle']
	const attributes = ref() as ReturnType<Props>['attributes']
	const slots = ref<VNodeNormalizedChildren>()
	const virgoClasses = toValue(inject(VIRGO_CLASSES, {}))
	const classList = ref({}) as ReturnType<Props>['classList']
	const unCompiledClassList = ref({}) as ReturnType<Props>['classList']
	unCompiledClassList.value = virgoClasses[_componentName]

	const calculateProps = () => {
		const _defaultProps = toValue(defaultProps)
		const { class: _class, style, attrs, ...restProps } = _defaultProps[_componentName] || {}
		if(_class) classList.value.inheritedClass = _class
		inlineStyle.value = style
		attributes.value = attrs

		/* eslint-disable @typescript-eslint/no-explicit-any */
		const componentProps = {} as any
		const otherProps = {} as any
		/* eslint-enable */

		Object.entries(restProps).forEach(([key, value]) => {
			if (key in definitionProps) componentProps[key] = value
			else otherProps[key] = value
		})

		newDefaultProps.value = mergeDefaultProps({ ..._defaultProps, [_componentName]: componentProps }, otherProps)

		const explicitPropsNames = objectKeys(vm?.vnode.props || {}) as unknown as (keyof Props)[]
		const explicitProps = objectPick(definitionProps, explicitPropsNames)

		propsRef.value = mergeDefaultProps(definitionProps, componentProps, explicitProps) as Props
	}

	const generateClasses = () => {
		const compiledClasses: Record<string, unknown> = {}
		slots.value = vm?.slots
		for (const key in unCompiledClassList.value) {
			const currentConfig = unCompiledClassList.value[key]
			let compiledClass = undefined

			if (currentConfig && !propsRef.value.bare) {
				if (typeof currentConfig === 'function') {
					const configClassCtx: ToNormalizedVariant<Props> = Object.assign({}, propsRef.value, {
						variant: undefined,
						slots: slots.value
					})

					if (propsRef.value.variant) {
						const normalizedVariants = normalizeClass(propsRef.value.variant)
							.split(' ')
							.reduce((acc, v) => {
								acc[v] = true

								return acc
							}, {} as Record<string, boolean>)

						configClassCtx.variant = new Proxy(normalizedVariants, {
							get: (target, prop: string): boolean => {
								return target[prop] || false
							}
						})
					}

					compiledClass = currentConfig(configClassCtx)
				} else {
					compiledClass = currentConfig
				}
				compiledClasses[key] = compiledClass
			}
		}
		classList.value = {...classList.value, ...compiledClasses }
	}


	watch([() => definitionProps, () => toValue(defaultProps), () => vm?.slots], () => {
			calculateProps()
			generateClasses()
		},
		{
			deep: true,
			immediate: true
		})


	return {
		props: toReactive(propsRef),
		classList,
		inlineStyle,
		attributes
	}
}
