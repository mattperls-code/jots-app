import React from "react"

import { StatusBar } from "react-native"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import HomeStack from "./stacks/home"
import EditorStack from "./stacks/editor"

const App = () => {
    const Stack = createStackNavigator()

    StatusBar.setBarStyle("light-content")

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"home"} screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name={"home"} component={HomeStack} />
                <Stack.Screen name={"editor"} component={EditorStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App