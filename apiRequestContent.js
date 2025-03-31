export const apiRequestContent = `import axios from 'axios'
import baseUrl from './base-url'
import { getItem } from '../utils/localStorage'

export const POST = async <T>(url: string, body: unknown) => {
	const config = getRequestConfiguration()
	return await (
		await axios.post<T>(url, body, config)
	).data
}

export const PUT = async <T>(url: string, body?: unknown) => {
	const config = getRequestConfiguration()
	return await (
		await axios.put<T>(url, body, config)
	).data
}

export const GET = async <T>(url: string) => {
	const config = getRequestConfiguration()
	return await (
		await axios.get<T>(url, config)
	).data
}

export const PATCH = async <T>(url: string, body?: unknown) => {
	const config = getRequestConfiguration()
	return await (
		await axios.patch<T>(url, body, config)
	).data
}

export const DELETE = async <T>(url: string) => {
	const config = getRequestConfiguration()
	return await (
		await axios.delete<T>(url, config)
	).data
}

const getRequestConfiguration = () => {
	const timeout = 60_000; // equal to 1 minute
	const tokenAccess = getItem('token')
	const token = tokenAccess ? 'Bearer tokenAccess' : null
	const { token: cancelToken } = axios.CancelToken.source()
	const headers = token ? { Authorization: token } : { Authorization: null }

	return {
		headers,
		timeout,
		cancelToken
	}
}
`