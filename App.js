import { useFonts } from 'expo-font'
import React from 'react'
import Navigation from './App/Navigation'
import { Provider } from 'react-redux'
import store from './App/store'

function App() {
  const [loaded] = useFonts({
    THICCCBOIBold: require("./App/assets/fonts/THICCCBOI-Bold.ttf"),
    THICCCBOILight: require("./App/assets/fonts/THICCCBOI-Light.ttf"),
    THICCCBOIRegular: require("./App/assets/fonts/THICCCBOI-Regular.ttf"),
    THICCCBOIMedium: require("./App/assets/fonts/THICCCBOI-Medium.ttf"),
    THICCCBOISemiBold: require("./App/assets/fonts/THICCCBOI-SemiBold.ttf"),
    LatoRegular: require("./App/assets/fonts/Lato/Lato-Regular.ttf"),
  })
  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}


export default App  
