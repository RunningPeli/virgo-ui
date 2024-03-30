import type { Preset } from '@unocss/core'
import { variants } from './variants'


export function presetVirgo(): Preset {
	return {
		name: '@virgo-ui/preset-core',
		variants
	}
}
