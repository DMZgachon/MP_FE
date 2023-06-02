import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    Image,
    View,
    Button,
    TextInput
} from 'react-native';

function EnterEmail(props){
    return(
        <View style={styles.container}>
            <View style={{flex: 2}}></View>
            <Text style={styles.textBold}>이메일, 비밀번호</Text>
            <Text style={styles.text}>입력해주세요.</Text>
            <View style={{flex: 2}}></View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <TextInput
                    style={styles.textInput}
                    //onChangeText={(text) => {this.setState({inputText: text})}}
                    placeholder="이메일을 입력해주세요."
                />
                <TextInput
                    style={styles.textInput}
                    //onChangeText={(text) => {this.setState({inputText: text})}}
                    placeholder="비밀번호를 입력해주세요."
                    secureTextEntry={true}
                />
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
        borderColor: 'gray',
        borderWidth: 1
    }
});

export {EnterEmail}