import { useEffect, useState } from "react"

const useDebounce = <T>( value: T, delay:number ): T | undefined => {
  const [debouncedValue,setDebouncedValue] = useState<T>()

  useEffect(() => {

    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay )

    return () => {
      clearTimeout(timeout)
    }
  },[value])

  return debouncedValue
}

export default useDebounce