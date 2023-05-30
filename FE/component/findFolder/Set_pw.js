import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    TouchableHighlight, Modal} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Set_pw(props){
    return(
        <View style={styles.container}>

            <View style={{flex: 2}}></View>
            <Text style={styles.Title}>비밀번호 재설정</Text>
            <View style={{flex: 1}}></View>
            <TextInput
                style={styles.textInput}
                placeholder="새로운 비밀번호 입력"
            />
            <TextInput
                style={styles.textInput}
                placeholder="새로운 비밀번호 재입력"
                secureTextEntry={true}
            />
            <View style={{flex: 1}}></View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    props.navigation.navigate('Login')}
                }>
                    <Text style={styles.buttonText}>저장</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white",
    },

    Title:{
        marginLeft: '-5%',
        width: "55%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 25,
        color: "black"
    },
    button:{
        width: "70%",
        borderRadius: 40,
        height: "35%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#FF037C"
    },
    textBold:{
        marginLeft: '-5%',
        width: "55%",
        paddingTop: 40,
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 28,
        color: "black"
    },
    text:{
        marginLeft: '-5%',
        width: "55%",
        textAlign: "left",
        fontSize: 28
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    },
    textInput: {
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        width: "65%",
        fontSize: 16,
        //borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
});

export {Set_pw}