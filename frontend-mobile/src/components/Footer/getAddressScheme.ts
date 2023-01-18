import { IS_IOS } from '@pf/constants';
import Config from 'react-native-config';

const EMPTY_STRING = '';
const WHITESPACE = ' ';
const PLUS_SIGN = '+';
const COMMA = ',';
const WHITESPACE_ENC = '%20';
const COMMA_ENC = '%26';

const IOS_SCHEME = 'http://maps.apple.com/?q=';
const ANDROID_SCHEME = 'geo:0,0?q=';

export const getAddressScheme = (): string => {
  const address = Config.ADDRESS;
  if (!address) {
    return EMPTY_STRING;
  }

  if (IS_IOS) {
    const preparedAddress = address.split(WHITESPACE).join(PLUS_SIGN);
    return IOS_SCHEME + preparedAddress;
  }

  const preparedAddress = address
    .split(WHITESPACE)
    .map(str => str.replace(COMMA, COMMA_ENC))
    .join(WHITESPACE_ENC);

  return ANDROID_SCHEME + preparedAddress;
};
