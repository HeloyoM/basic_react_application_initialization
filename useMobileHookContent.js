export const useMobileHookContent = `import { useEffect, useState } from 'react'

export const MOBILE_WIDTH = 600

const getPageWidth = () => {
	const { innerWidth: width } = window
	return width
}

export function useWindowWidth() {
	const [windowWidth, setWindowWidth] = useState(getPageWidth())

	useEffect(() => {
		function handleResize() {
			setWindowWidth(getPageWidth())
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowWidth
}
`