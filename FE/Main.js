import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // 네비게이션 컨테이너
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack 네비게이션
import { MainPage } from './component/MainPage'
import {EnterEmail} from "./component/EnterEmail";


const Stack = createNativeStackNavigator(); // Stack Navigation함수를 Stack변수명으로 저장

const Main = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="EnterEmail" component={EnterEmail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Main;