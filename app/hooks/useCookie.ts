import Cookies from 'js-cookie'
import { useCallback, useState } from 'react'

export const useCookie = (name: string, initialValue: string) => {
	const [value, setValue] = useState<any>(() => {
		const cookie = Cookies.get(name)
		if (cookie) return cookie

		Cookies.set(name, initialValue, { expires: 365, sameSite: 'strict' })
		return initialValue
	})

	const updateCookie = useCallback(
		(newVal, options) => {
			Cookies.set(name, newVal, options)
			setValue(newVal)
		},
		[name]
	)

	const deleteCookie = useCallback(() => {
		Cookies.remove(name)
		setValue(null)
	}, [name])

	return [value, updateCookie, deleteCookie]
}
