import type { ComponentClasses } from '@/plugin'
import type { virgoInputProps } from '@/components/input/meta'

export const virgoInputClasses: ComponentClasses<virgoInputProps> = {
	baseInputRoot: 'virgo-input-root',
	fileType: 'file:[&_.virgo-base-input-child]-rounded-lg file:[&_.virgo-base-input-child]-border-none file:[&_.virgo-base-input-child]-mr-4 file:[&_.virgo-base-input-child]-px-4 file:[&_.virgo-base-input-child]-py-3 file:[&_.virgo-base-input-child]-text-gray-200 file:[&_.virgo-base-input-child]-rounded-r-none file:[&_.virgo-base-input-child]-bg-purple-500/05] !all-[.virgo-base-input-input-wrapper]-px-0',
	input: 'virgo-input-input'
}

export type virgoInputClassesValidKeys = keyof typeof virgoInputClasses

