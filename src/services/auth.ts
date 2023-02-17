import { request } from '@umijs/max'

export async function signup(body?: API.User) {
	return request<string>('/api/signup', {
		method: 'post',
		data: body,
	})
}

export async function signin(body?: API.User) {
	return request<string>('/api/signin', {
		method: 'post',
		data: body,
	})
}
