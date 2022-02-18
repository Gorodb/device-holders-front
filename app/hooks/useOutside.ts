import {useState, useEffect, useRef, Dispatch, SetStateAction, Ref} from 'react'

type TypeOut = {
	ref: any
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (customRefs: Ref<any>[]): TypeOut => {
	const [isShow, setIsShow] = useState(false)
	const ref = useRef<HTMLElement>(null)

	const handleClickOutside = (event: any) => {
		console.log(event.target)
		if (ref.current && !ref.current.contains(event.target)) {
			// @ts-ignore
			if (!customRefs.find(ref => ref.current === event.target)) {
				setIsShow(false)
			}
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})
	return { ref, isShow, setIsShow }
}
