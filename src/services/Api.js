/** --------------------------
    API call configurations
 --------------------------**/
import { create } from 'apisauce';
import Config from 'react-native-config';

export const api = create({
  baseURL: Config.API_ROOT_PATH,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${Config.BEARER_TOKEN}`,
  },
  timeout: 15000,
});
