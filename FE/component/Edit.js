import {Header} from './Header'
import React, {Component, useState} from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image,
    TouchableHighlight, Modal, Button, Alert
} from 'react-native'

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "./footer";

function Edit(props){
    console.log('Edit Page : ', props.route.params.data)
    const [images, changeImage] = useState(props.route.params.data)

    const showAlert = (content, index) => {
        Alert.alert(
            content,
            'Delete Sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        console.log(content)
                        const filteredCategory = images.filter(item => item[1] !== content);
                        changeImage(filteredCategory);
                        console.log(content, '카테고리 삭제함')
                    }
                }
            ],
            { cancelable: false }
        );
    };

    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = '카테고리 삭제'></Header>
            </View>

            <View style ={{ width : '100%', height : '60%', alignItems : 'center', margin : 3}}>
                    <ScrollView>
                        {
                            images.map((content, i ) =>{
                                console.log(content[1])
                                return(
                                    <View>
                                        <TouchableOpacity
                                            onPress={() =>
                                            {showAlert(content[1], i)}
                                            } key={i}>

                                            <Image
                                                style={{
                                                    width: 300,
                                                    height: 220,
                                                    borderColor: 'blue',
                                                    marginBottom: 20 // 이미지 간격 조절
                                                }}
                                                source={{uri : content[0]}}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                )
                            })
                        }
                    </ScrollView>
            </View>



            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 2, width : '95%', justifyContent : 'center'}}>
                    <Footer navigation = {props.navigation} data ={props.route.params.data}></Footer>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
});

export {Edit}