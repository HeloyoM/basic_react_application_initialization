export const localStorageUtilContent = `export const getItem = item => JSON.parse(localStorage.getItem(item))

export const setItem = (item, value) =>
	localStorage.setItem(item, JSON.stringify(value))

export const removeItem = key => localStorage.removeItem(key)
`