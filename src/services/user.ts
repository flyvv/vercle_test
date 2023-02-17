import { request } from '@umijs/max'

export async function getUser() {
	return request<API.Data<API.User>>('/api/user', {
		method: 'GET',
	})
}

export async function addUser(body?: API.User) {
	return request<string>('/api/user', {
		method: 'post',
		data: body,
	})
}

export async function deleteUser(id) {
	return request<string>(`/api/user/${id}`, {
		method: 'DELETE',
	})
}
