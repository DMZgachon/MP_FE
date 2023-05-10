import axios from 'axios';
import Config from 'react-native-config';

const instance = axios.create({
    baseURL: "http://34.64.202.67", // 프록시 서버의 주소와 포트를 사용
});

export default instance;
