import { virgo } from '@virgo-ui/vue'

import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'

import 'uno.css'

import '@virgo-ui/vue/dist/style.css'
import '@virgo-ui/theme-base/dist/style.css'

import Api from '../../components/api.vue'
import DemoBlock from '../components/demo-block'
import WarnBadge from '../components/warn-badge'
import ComingBadge from '../components/coming-badge'
import UpdateBadge from '../components/update-badge'
import NewBadge from '../components/new-badge'
import KeyboardTable from '../components/keyboard-table'

import { extractFileNameFromPath } from '../../utils'
import './style.scss'

export default {
	...DefaultTheme,
	// 'kbd': 'outline-1 outline-solid outline-a-border p-[0.2em_0.45em] rounded-lg min-w-[33px] opacity-60',
	enhanceApp({ app }: { app: App }) {
		app.use(virgo)

		// Register demos as components
		const demos = import.meta.glob('../../components/demos/**/*.vue', { eager: true })


		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		for (const path in demos) app.component(extractFileNameFromPath(path) as string, (demos[path] as any).default)

		// Other component registration
		/* eslint-disable vue/multi-word-component-names */
		app.component('api', Api)
		app.component('demo', DemoBlock)
		app.component('warn-badge', WarnBadge)
		app.component('coming-badge', ComingBadge)
		app.component('update-badge', UpdateBadge)
		app.component('new-badge', NewBadge)
		app.component('keyboard-table', KeyboardTable)
		/* eslint-enable */
	}
}
