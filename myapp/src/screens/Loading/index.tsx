import { ActivityIndicator, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const Loading = () => {
  return (
    <SafeAreaView>
      <>
        <Image />
        <ActivityIndicator />
      </>
    </SafeAreaView>
  )
}