import axios from 'axios';
import {API} from 'react-native-dotenv';

const instance = axios.create({
  baseURL: API,
});

export default instance;
