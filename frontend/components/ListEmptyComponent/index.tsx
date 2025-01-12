import { ThemedView } from "../ui"

const ListEmptyComponent = ({ lookup }: { lookup: string }) => {
  return (
    <ThemedView>no { lookup } found</ThemedView>
  )
}

export default ListEmptyComponent