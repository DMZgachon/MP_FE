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
    Button,
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

function CategoryPage(props){
    const CancelToken = axios.CancelToken;
    let cancel;
    const [bucket_image, changeimage] = useState([])
    const [bucket_title, changetitle] = useState([])
    const [listlist, changeList] = useState([])
    const [rows,setRows] = useState(0);
    const [bucketList, setBucketList] = useState([])
    const [category, setCategory] = useState(props.route.params.category)
    const [content2, setContent] = useState(props.route.params.data)
    const [count, changeCount] = useState()
    useFocusEffect(
        React.useCallback(() => {
            console.log('Screen was focused');
            console.log("이거 잘 받아졌는 지 확인해보자 :" ,content2);
            instance
                .get(`/api/bucket/load/${id}`)
                .then(async (response) => {
                    //console.log(response)
                    changeList(response)
                    console.log('자 축소하자',response.request._response);
                    const parsedResponse = JSON.parse(response.request._response);
                    const bucketImageList = parsedResponse.data.map(item => item.bucketImage);
                    console.log('asdfasdfsadf',bucketImageList);
                    changeimage(bucketImageList)

                    const bucketTitle = parsedResponse.data.map(item => item.title);
                    console.log(bucketTitle);
                    changetitle(bucketTitle)

                    const newItems = response.data.data.map(item => [item.id, item.bucketImage, item.title]);
                    setBucketList(newItems);
                    console.log(Math.ceil(newItems.length / 2));
                    setRows(Math.ceil(newItems.length / 2));
                    changeCount(Math.ceil(newItems.length / 2));
                })
                .catch((error) => {
                    console.log('버킷 발급 실패');
                });

            getAndReissueTokens(cancel).then(r => console.log('getAndReissueTokens'));

            return () => {
                console.log('Screen was unfocused');
                if (cancel !== undefined) cancel();
            };
        }, [])
    );


    const id = props.route.params.data[2]
    return(
        <View style={styles.container}>

            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Header data = {props.route.params.data[1]}></Header>
            </View>

            <Text style={{fontSize: 20, color: '#FF357E'}}>"{props.route.params.data[1]}"의 버킷</Text>

            <View style ={{ width : '2500%', height : '70%', alignItems : 'center', margin : 3}}>
                {
                    count !== 0 ? (
                        <ScrollView>
                            <View style={{ flexDirection: 'column' }}>
                                {Array.from(Array(rows)).map((_, rowIndex) => (
                                    <View style={{ flexDirection: 'row' }} key={rowIndex}>
                                        {Array.from(Array(2)).map((_, colIndex) => {
                                            const index = rowIndex * 2 + colIndex;
                                            if (index < bucketList.length) {
                                                const content = bucketList[index];
                                                console.log(content);
                                                return (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            props.navigation.navigate('BucketDetail', {data : bucket_title[index], id : content[0], categoryId : content2[2], modify: true});
                                                        }}
                                                        key={index}
                                                    >
                                                        <View>
                                                            <View style={{ flexDirection: 'column', alignItems: 'center',
                                                                margin: 10, backgroundColor: 'white', borderRadius: 0, borderColor: 'black',
                                                                borderWidth: 1,}}>
                                                                <Text style={{fontSize:17, textAlign: 'center', color: 'black'}}>{content[2]}</Text>
                                                                <Image
                                                                    style={{
                                                                        width: 160,
                                                                        height: 140,
                                                                        borderColor: '#FFECEC',
                                                                        borderWidth: 2,
                                                                        flexDirection: 'row',
                                                                        borderRadius: 0,
                                                                    }}
                                                                    source={{ uri: content[1] }}
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
                    ) : (
                        <Image
                            source={require('./../../img/김이영.png')}
                            style={{ width: 280, height: 270}}
                        />
                    )
                }
            </View>

            <View style={styles.bottomView}>
                <View style={{flexDirection: 'row', flex: 2, width : '100%', justifyContent : 'center'}}>
                    <Footer navigation = {props.navigation} data ={props.route.params.data} category={content2} name='Category'></Footer>
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
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
});

export {CategoryPage}