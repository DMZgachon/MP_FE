import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,TouchableHighlight,
Modal} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Footer(props){
    return(
        <View style={styles.container}>
            <View style = {{width : '100%', height : '100%', flexDirection: 'row' , backgorundColor : 'red'}}>
                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('LoginPage', {data : 'My BucketList App'})}
                    }>
                        <Text style ={{fontSize : 35}}> 🏠 </Text>
                    </TouchableOpacity>
                </View>

                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('SearchPage',{data : 'SearchPage'})}
                    }>
                        <Text style ={{fontSize : 35}}> 🔍 </Text>
                    </TouchableOpacity>
                </View>

                <View style ={{flex : 3, alignItems : 'center'}}>
                    <TouchableHighlight onPress={{}}>
                        <Text style ={{fontSize : 35}}> ➕ </Text>
                    </TouchableHighlight>
                </View>

                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%',}} onPress={()=>{
                        props.navigation.navigate('ChattingPage', {data : 'ChattingPage'})}
                    }>
                        <Text style ={{fontSize : 35}}> 💬 </Text>
                    </TouchableOpacity>
                </View>

                <View style ={{flex : 1.5, alignItems : 'center'}}>
                    <TouchableOpacity style={{alignItems : 'center', width : '100%'}} onPress={()=>{
                        props.navigation.navigate('FriendPage', {data : 'FriendPage'})}
                    }>
                        <Text style ={{fontSize : 35}}> 👤 </Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height : '30%',
        position : 'absolute',
        bottom : 0
    },
});

export {Footer}