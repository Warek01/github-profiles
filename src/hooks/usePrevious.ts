import React from 'react'

/** Returns previous value of a state */
const usePrevious = <T>(initialState: T): T => {
  const ref = React.useRef<T>(initialState)

  // useEffect will assign the new value AFTER the return statement, thus returning the old value
  React.useEffect(() => {
    ref.current = initialState
  }, [initialState])

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

export default usePrevious
