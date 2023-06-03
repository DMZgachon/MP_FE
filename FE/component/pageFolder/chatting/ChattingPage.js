import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    Button,
    FlatList,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    Image,
    Platform
} from 'react-native';
import {Colors, DebugInstructions, LearnMoreLinks, ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "../Layout/footer";
import {Header} from '../Layout/Header';

import ImagePicker from "react-native-image-picker";
import { launchImageLibrary } from 'react-native-image-picker';

import {useFocusEffect} from "@react-navigation/native";
import axios from "axios";
import {getAndReissueTokens} from "../../../api/reRefresh";
import {Screen} from "react-native-screens";
import {instance} from "../../../api/axiosInstance";

function ChattingPage(props) {
    const CancelToken = axios.CancelToken;
    let cancel;
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef(null);

    const renderItem = ({ item }) => (
        <View style={[styles.messageContainer, item.role == "user" ? styles.myMessageContainer : styles.otherMessageContainer]}>
            {!(item.role == "user") && <Image source={require('../../img/gpt.png')} style={styles.image} />}
            <View style={[styles.message, item.role == "user" ? styles.myMessage : styles.otherMessage]}>
                <Text>{item.content}</Text>
            </View>
        </View>
    );
    useFocusEffect(
        React.useCallback(() => {
            console.log('Screen was focused');

            getAndReissueTokens(cancel).then(r => console.log('getAndReissueTokens'));

            return () => {
                console.log('Screen was unfocused');
                if (cancel !== undefined) cancel();
            };
        }, [])
    );

    const [keyboardStatus, setKeyboardStatus] = useState(false);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardStatus(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardStatus(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [messages]);
    const sendMessage = () => {
        const newMessage = { role: "user", content: text }; // isMyMessage는 현재 사용자의 메시지를 구분하기 위해 추가했습니다. 이 값을 적절하게 설정해야 합니다.
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        sendQuestion(updatedMessages);
        setText('');
    };
    const sendQuestion = (updatedMessages) => {
        instance
            .post(`/api/chat-gpt/question`, updatedMessages,{
                headers: { "application/json": "charset=utf-8" },
            })
            .then((response) => {
                let newMessage = response.data.choices[0].message;

                setMessages(prevMessages => [...prevMessages, newMessage]);

                console.log(messages);
            })
            .catch((error) => {
                console.log("요청 실패");
            });
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.container}>

                <View style={{position: 'absolute', top: 0, left: 0, right: 0}}>
                    <Header data={props.route.params.data}></Header>S
                </View>
                <SafeAreaView style={{...styles.navBox1, marginTop: 70}}>
                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollViewContent}
                        onContentSizeChange={() =>
                            scrollViewRef.current.scrollToEnd({ animated: true })
                        }
                    >
                        {
                            messages.map((item, index) => {
                                return (
                                    <View key={index} style={[styles.messageContainer, item.role == "user" ? styles.myMessageContainer : styles.otherMessageContainer]}>
                                        {!(item.role == "user") && <Image source={require('../../img/gpt.png')} style={styles.image} />}
                                        <View style={[styles.message, item.role == "user" ? styles.myMessage : styles.otherMessage]}>
                                            <Text style={{color:'black'}}>{item.content}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        {/*<FlatList*/}
                        {/*    data={messages}*/}
                        {/*    renderItem={renderItem}*/}
                        {/*    keyExtractor={(_, index) => index.toString()}*/}
                        {/*    style={styles.flatList}*/}
                        {/*/>*/}
                    </ScrollView>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={text}
                            onChangeText={setText}
                            placeholder="메세지를 입력하세요..."
                        />
                        <Button title="  입력  " onPress={sendMessage}/>
                    </View>

                </SafeAreaView>
                <View style={{flex: 1, marginBottom: 0}}></View>
                {!keyboardStatus &&
                    <View style={styles.bottomView}>
                        <View style={{flexDirection: 'row', flex: 2, width: '100%', justifyContent: 'center'}}>
                            <Footer navigation={props.navigation} data={props.route.params.data}></Footer>
                        </View>
                    </View>
                }

            </View>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    flatList: {
        marginBottom: 60,  // 또는 적당한 값을 사용하세요
    },
    navBox1: {
        width: "100%",
        height: '80%',
        marginBottom: '5%',
        padding: '5%',
        paddingRight: '-3%',
        flexDirection: 'column', // Here, change 'row' to 'column'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        marginRight: 10,
        padding: 5,
    },
    // ...기존 스타일...
    messageContainer: {
        flexDirection: 'row', // 이미지와 메세지를 나란히 배치
        alignItems: 'center', // 가로축(center)을 기준으로 정렬
        padding: 10,
        margin: 10,
        marginBottom: -5,
        maxWidth: '70%',
    },
    myMessageContainer: {
        alignSelf: 'flex-end',
    },
    otherMessageContainer: {
        alignSelf: 'flex-start',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 8,
        marginLeft: -20,
    },
    // 메세지 말풍선 스타일
    message: {
        padding: 10,
        borderRadius: 10,
        flexShrink: 1, // 너비가 부모를 초과할 경우 줄일 수 있음
    },
    myMessage: {
        backgroundColor: '#a6d1fc',
    },
    otherMessage: {
        backgroundColor: '#e3e3e7',
    },
    scrollView: {
        flex: 1,
        marginBottom: 60,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});

export {ChattingPage}