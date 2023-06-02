import axios from 'axios';
import Config from 'react-native-config';

const instance = axios.create({
    baseURL: "http://34.64.202.67", // 프록시 서버의 주소와 포트를 사용
});

// 액세스 토큰을 인자로 받아서 Authorization 헤더에 설정하는 함수
const setAccessTokenHeader = (accessToken) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

export { instance, setAccessTokenHeader };
