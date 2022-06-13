import axios from 'axios';
import { serverUrl } from './config';
const instance = axios.create({
  baseURL: serverUrl
});
export default instance;
