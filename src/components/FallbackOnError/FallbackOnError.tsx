import React from 'react'

interface IProps {
  fallbackComponent: React.ReactNode
  children: React.ReactNode
}

interface IState {
  hasError: boolean
}

class FallbackOnError extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(): Partial<IState> {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Error in Error Boundary', error, errorInfo.componentStack)
  }

  render() {
    return this.state.hasError ? this.props.fallbackComponent : this.props.children
  }
}

export default FallbackOnError
