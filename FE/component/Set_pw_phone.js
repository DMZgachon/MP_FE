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

function Set_pw_phone(props){
    return(
        <View style={styles.container}>
            <View style={{flex: 1}}></View>
            <Text style={styles.Title}>비밀번호 재설정</Text>
            <Text style={styles.textBold}>전화번호</Text>
            <Text style={styles.text}>입력 해주세용</Text>
            <View style={{flex: 1}}></View>

            <TextInput
                style={styles.textInput}
                placeholder="전화번호를 입력해주세요."
                secureTextEntry={true}
            />
            <View style={{flex: 1}}></View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TouchableOpacity style={styles.button} onPress={()=>{
                    props.navigation.navigate('Set_pw_code')}
                }>
                    <Text style={styles.buttonText}>입력</Text>
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
    navBox: {
        width: "100%",
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backBtn: {
        justifyContent: 'flex-start',
        padding: "3%",
    },
    backImg: {
        marginLeft: 20,
        width: 35,
        height: 30,
        resizeMode: "cover"
    },
    Title:{
        width: "55%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 32,
        color: "black"
    },
    button:{
        width: "80%",
        borderRadius: 40,
        height: "35%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#FF037C"
    },
    textBold:{
        width: "55%",
        paddingTop: 40,
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 32,
        color: "black"
    },
    text:{
        width: "55%",
        textAlign: "left",
        fontSize: 32
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
        //borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    }
});

export {Set_pw_phone}