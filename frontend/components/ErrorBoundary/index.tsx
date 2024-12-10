import React, { Component } from 'react'

import { ThemedView, ThemedText } from '../ui'

class ErrorBoundary extends Component {
  
  state = {
    hasError:false,
    error:null
  }
  
  static getDerivedStateFromError(error){
    return { hasError: true }
  }
  
  componentDidCatch(error) {
    console.log(error)
  }
  
  render(){
    if(this.state.hasError) {
      return (
        <ThemedView>
          <ThemedText>
            an error has occured
          </ThemedText>
        </ThemedView>
      )
    }
    return this.props.children
  }
  
}

export default ErrorBoundary