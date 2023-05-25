import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // 네비게이션 컨테이너
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack 네비게이션
import {MainPage} from './component/loginFolder/MainPage';
import {HomePage} from './component/pageFolder/Home/HomePage';
import {Edit} from './component/pageFolder/Home/Edit';
import {SearchPage} from './component/pageFolder/search/SearchPage';
import {ChattingPage} from './component/pageFolder/chatting/ChattingPage';
import {FriendPage} from './component/pageFolder/friend/FriendPage';
import {Setting} from "./component/pageFolder/friend/Setting";
import {ManagePage} from "./component/pageFolder/friend/ManagePage";
import {Question} from "./component/pageFolder/friend/Question";
import {Condition} from "./component/pageFolder/friend/Condition";
import {CategoryPage} from './component/pageFolder/category/CategoryPage';
import {Upload} from './component/pageFolder/Home/Upload';
import {Login} from './component/loginFolder/Login';
import {Signup} from './component/signUpFolder/Signup';
import {Completion} from './component/signUpFolder/Completion';
import {Input_code} from './component/signUpFolder/Input_code';
import {Input_name} from './component/signUpFolder/Input_name';
import {Input_phonenum} from './component/signUpFolder/Input_phonenum';
import {Set_pw} from './component/findFolder/Set_pw';
import {Set_pw_code} from './component/findFolder/Set_pw_code';
import {Set_pw_phone} from './component/findFolder/Set_pw_phone';
import {Check_pw} from './component/findFolder/Check_pw';
import {addCategory} from "./component/pageFolder/category/addCategory";

const Stack = createNativeStackNavigator(); // Stack Navigation함수를 Stack변수명으로 저장

function Main(){
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="MainPage" component={MainPage} />
                <Stack.Screen name="HomePage" component={HomePage} />
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
                <Stack.Screen name="Setting" component={Setting}/>
                <Stack.Screen name="ManagePage" component={ManagePage}/>
                <Stack.Screen name="Question" component={Question}/>
                <Stack.Screen name="Condition" component={Condition}/>
                <Stack.Screen name="Category" component={CategoryPage} />
                <Stack.Screen name="addCategory" component={addCategory} />
                <Stack.Screen name="Check_pw" component={Check_pw} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Main;