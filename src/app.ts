import { history } from '@umijs/max'
import { message, notification } from 'antd'
import { decode } from 'jsonwebtoken'

enum ErrorShowType {
	SILENT = 0, //无动作
	WARN_MESSAGE = 1, //警告
	ERROR_MESSAGE = 2, //错误
	NOTIFICATION = 3, //提示
}

const errorThrower = (res) => {
	const { success, data, errorCode, errorMessage } = res
	if (!success) {
		const error: any = new Error(errorMessage)
		error.name = '错误'
		error.info = { errorCode, errorMessage, data }
		throw error
	}
}

const errorHandler = (error) => {
	if (error.name === '错误') {
		const errorInfo = error.info
		if (errorInfo) {
			const { errorCode, errorMessage, showType } = errorInfo
			switch (showType) {
				case ErrorShowType.SILENT:
					break
				case ErrorShowType.WARN_MESSAGE:
					message.warn(errorMessage)
					break
				case ErrorShowType.ERROR_MESSAGE:
					message.error(errorMessage)
					break
				case ErrorShowType.NOTIFICATION:
					notification.open({
						message: errorCode,
						description: errorMessage,
					})
					break
				default:
					message.error(errorMessage)
					break
			}
		} else if (error.response) {
			message.error(`响应状态码：${error.response.status}`)
		} else if (error.request) {
			message.error('没有收到响应')
		} else {
			message.error('请求失败')
		}
	}
}

export const request = {
	timeout: 3000,
	headers: {
		['Content-Type']: 'application/json',
		Accept: 'application/json',
		Credential: 'include',
	},
	errorConfig: {
		errorHandler,
		errorThrower,
	},
	// 请求拦截器
	requestInterceptors: [
		(url, options) => {
			options.headers = options.headers || {}
			const token = localStorage.getItem('token')
			if (token) {
				options.headers.authorization = token
			}
			return { url, options }
		},
	],
	// 相应拦截器
	responseInterceptors: [
		(response, options) => {
			return response.data
		},
	],
}

export async function getInitialState() {
	let initialState: any = {
		currentUser: null,
	}
	const token = localStorage.getItem('token')
	if (token) {
		initialState.currentUser = decode(token)
	}
	return initialState
}

export const layout = ({ initialState }) => {
	return {
		title: 'UMI4',
		onPageChange() {
			const { currentUser } = initialState
			if (!currentUser) {
				history.push('/signin')
			}
		},
	}
}
