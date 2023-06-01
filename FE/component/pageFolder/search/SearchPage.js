import React, {useState} from 'react';
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
    Button, TextInput, KeyboardAvoidingView,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Footer} from "../Layout/footer";
import {Header} from '../Layout/Header'
import axios from "axios";
import {useFocusEffect} from "@react-navigation/native";
import {getAndReissueTokens} from "../../../api/reRefresh";
import {instance} from "../../../api/axiosInstance";



function SearchPage(props){
    const CancelToken = axios.CancelToken;
    let cancel;

    const [search, setSearch] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [rows, setRows] = useState(0);

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

    const onClickSearch = () => {
        console.log("검색어: ", search);

        instance
            .get(`/api/bucket/searchByTag/${search}`)
            .then((response) => {
                console.log('자 축소하자',response.request._response);
                console.log('data 보자 ', response.data.data)
                const newItems = response.data.data.map(item => [item.bucketImage, item.deadline, item.id, item.title]);

                setSearchList(newItems);
                console.log(Math.ceil(newItems.length / 2));
                setRows(Math.ceil(newItems.length / 2));
            })
            .catch((error) => {
                console.log('-------------------------서치 실패--------------------------');
            });
    }
    return(
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data}></Header>
            </View>

            <View>
                <ScrollView
                    contentContainerStyle={{flex: 1}}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='handled'>

                    <View style={{ flexDirection: 'row', marginTop: 60}}>
                        <TextInput
                            style={styles.input}
                            placeholder="태그를 이용해 검색해보세요"
                            onChangeText={text => setSearch(text)}
                        />
                        <TouchableOpacity style={{
                            backgroundColor: '#8e44ad',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            padding: 10,
                        }} onPress={() => {onClickSearch()}}>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}> 검색 </Text>
                        </TouchableOpacity>
                    </View>

                    <View style ={{ width : '100%', height : '70%', alignItems : 'center', margin : 3}}>
                        <ScrollView>
                            <View style={{ flexDirection: 'column' }}>
                                {Array.from(Array(rows)).map((_, rowIndex) => (
                                    <View style={{ flexDirection: 'row' }} key={rowIndex}>
                                        {Array.from(Array(2)).map((_, colIndex) => {
                                            const index = rowIndex * 2 + colIndex;
                                            if (index < searchList.length) {
                                                const content = searchList[index];
                                                console.log(content);
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            //props.navigation.navigate('HomePage', { data: 'HomePage' });
                                                        }}
                                                        key={index}
                                                    >
                                                        <View>
                                                            <View style={{ flexDirection: 'column', alignItems: 'center',
                                                                margin: 10, backgroundColor: 'white', borderRadius: 0, borderColor: 'black',
                                                                borderWidth: 1,}}>
                                                                <Text style={{fontSize:17, textAlign: 'center', color: 'black'}}>{content[3]}</Text>
                                                                <Image
                                                                    style={{
                                                                        width: 160,
                                                                        height: 145,
                                                                        borderColor: '#FFECEC',
                                                                        borderWidth: 2,
                                                                        flexDirection: 'row',
                                                                        borderRadius: 0,
                                                                    }}
                                                                    source={{ uri: content[0] }}
                                                                />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                );
                                            } else {
                                                return <View style={{ flex: 0.5 }} key={index} />;
                                            }
                                        })}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                </ScrollView>
            </View>

            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 2, width : '100%', justifyContent : 'center'}}>
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
        backgroundColor: '#FFF4F4',
    },
    keyboardContainer: {
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF4F4',
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    input: {
        backgroundColor: '#fff',
        width: 300,
        fontSize: 16,
        borderRadius: 10,
    },

});

export {SearchPage}