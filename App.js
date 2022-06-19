import { useFonts } from 'expo-font'
import React from 'react'
import Navigation from './App/Navigation/index.js'

export default function App() {
  const [loaded] = useFonts({
    THICCCBOIBold: require("./App/assets/fonts/THICCCBOI-Bold.ttf"),
    THICCCBOILight: require("./App/assets/fonts/THICCCBOI-Light.ttf"),
    THICCCBOIRegular: require("./App/assets/fonts/THICCCBOI-Regular.ttf"),
    THICCCBOIMedium: require("./App/assets/fonts/THICCCBOI-Medium.ttf"),
    THICCCBOISemiBold: require("./App/assets/fonts/THICCCBOI-SemiBold.ttf"),
  })
  if (!loaded) {
    return null
  }

  return (
    <Navigation />
  )
}

