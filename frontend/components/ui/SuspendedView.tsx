import React from "react"
import ThemedActivityIndicator from './ThemedActivityIndicator'
import ThemedView from './ThemedView';
import { ViewProps } from "react-native";

type SuspendedViewProps = ViewProps & {
  status:'error' | 'pending' | 'success';
}

const SuspendedView = ( { status, children, ...props }: SuspendedViewProps) => {

  return (
    <ThemedView {...props}>
      { status !== 'success'? <ThemedActivityIndicator /> : children }
    </ThemedView>
  )
}

export default SuspendedView;