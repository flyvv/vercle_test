import { defineConfig } from '@umijs/max'
import routes from './routes'

export default defineConfig({
	npmClient: 'yarn',
	routes,
	antd: {},
	tailwindcss: {},
	request: {},
	model: {},
	initialState: {},
	proxy: {
		'/api/': {
			target: 'http://192.168.1.107:7001/',
			changeOrigin: true,
		},
	},
	layout: {
		title: 'UMI',
		locale: false, //关掉国际化
	},
	access: {},
})
