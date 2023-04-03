import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // 네비게이션 컨테이너
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Stack 네비게이션


const Page1 = ({navigation}) => {
    return (
        <View style={{flex:1, backgroundColor:"lightgreen"}}>
            <Text style={{fontSize:25}}>Page1</Text>
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <TouchableOpacity style={{width:50, height:50, backgroundColor:"aqua"}}
                                  onPress={() => navigation.navigate("P2")}>
                    <Text>P2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:50, height:50, backgroundColor:"aqua"}}
                                  onPress={() => navigation.navigate("P3")}>
                    <Text>P3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:50, height:50, backgroundColor:"aqua"}}
                                  onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Page2 = ({navigation}) => {
    return (
        <View style={{flex:1, backgroundColor:"gold"}}>
            <Text style={{fontSize:25}}>Page2</Text>
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <TouchableOpacity style={{width:50, height:50, backgroundColor:"aqua"}}
                                  onPress={() => navigation.navigate("P1")}>
                    <Text>P1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:50, height:50, backgroundColor:"aqua"}}
                                  onPress={() => navigation.navigate("P3")}>
                    <Text>P3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:50, height:50, backgroundColor:"aqua"}}
                                  onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Page3= ({navigation}) => {
    return (
        <View style={{flex:1, backgroundColor:"steelblue"}}>
            <Text style={{fontSize:25}}>Page3</Text>
            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                <TouchableOpacity style={{width:50, height:50, backgroundColor:"aqua"}}
                                  onPress={() => navigation.navigate("P1")}>
                    <Text>P1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:50, height:50, backgroundColor:"aqua"}}
                                  onPress={() => navigation.navigate("P2")}>
                    <Text>P2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:50, height:50, backgroundColor:"aqua"}}
                                  onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const Stack = createNativeStackNavigator(); // Stack Navigation함수를 Stack변수명으로 저장

const Main = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="P1" component={Page1} />
                <Stack.Screen name="P2" component={Page2} />
                <Stack.Screen name="P3" component={Page3} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Main;