import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // 네비게이션 컨테이너
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack 네비게이션
import { MainPage } from './component/MainPage'
import {LoginPage} from './component/LoginPage'
import {Edit} from './component/Edit'
import {SearchPage} from './component/SearchPage'
import {ChattingPage} from './component/ChattingPage'
import {FriendPage} from './component/FriendPage'
import {Category} from './component/Category'
import {Upload} from './component/Upload'
import {Login} from './component/Login'
import {Signup} from './component/Signup'
import {Completion} from './component/Completion'
import {Input_code} from './component/Input_code'
import {Input_name} from './component/Input_name'
import {Input_phonenum} from './component/Input_phonenum'
import {Set_pw} from './component/Set_pw'
import {Set_pw_code} from './component/Set_pw_code'
import {Set_pw_phone} from './component/Set_pw_phone'

const Stack = createNativeStackNavigator(); // Stack Navigation함수를 Stack변수명으로 저장

const Main = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="LoginPage" component={LoginPage} />
                <Stack.Screen name="Upload" component={Upload} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Completion" component={Completion} />
                <Stack.Screen name="Input_code" component={Input_code} />
                <Stack.Screen name="Input_name" component={Input_name} />
                <Stack.Screen name="Input_phonenum" component={Input_phonenum} />
                <Stack.Screen name="Set_pw" component={Set_pw} />
                <Stack.Screen name="Set_pw_code" component={Set_pw_code} />
                <Stack.Screen name="Set_pw_phone" component={Set_pw_phone} />
                <Stack.Screen name="Edit" component={Edit} />
                <Stack.Screen name="SearchPage" component={SearchPage} />
                <Stack.Screen name="ChattingPage" component={ChattingPage} />
                <Stack.Screen name="FriendPage" component={FriendPage} />
                <Stack.Screen name="Category" component={Category} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Main;