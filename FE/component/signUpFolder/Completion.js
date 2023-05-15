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

function Completion(props){
    return(
        <View style={styles.container}>
            <View style={{flex: 2}}></View>
            <Text style={styles.Title}>회원가입 완료.</Text>
            <Text style={styles.text}>당신의 꿈을 응원합니다</Text>
            <View style={{flex: 2}}></View>

            <View style={{flexDirection: 'row', flex: 2}}>
              <TouchableOpacity onPress={()=>{
                props.navigation.navigate('Login')}
              }>
                <Text style={styles.buttonText2}>로그인 페이지로 돌아가기</Text>
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
        width: "55%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 32,
        color: "black"
    },
    button:{
        width: "60%",
        height: "25%",
        marginLeft: 10,
        justifyContent: 'center',
        backgroundColor: "#f3b1d0"
    },
    textBold:{
        width: "55%",
        textAlign: "left",
        fontWeight: 'bold',
        fontSize: 32,
        color: "black"
    },
    text:{
        width: "55%",
        paddingTop: 10,
        textAlign: "left",
        fontSize: 20,
        color: "#565656"
    },
    buttonText2:{
        textAlign: 'center',
        color: "#c77293",
        fontSize: 15,
        textDecorationLine: 'underline',
        fontWeight: 'bold'
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

export {Completion}