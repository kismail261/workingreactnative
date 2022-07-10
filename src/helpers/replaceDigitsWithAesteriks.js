import { Toast } from 'native-base'
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export function replacePhoneNumbers(z) {
  const w = z.toString();
  if (w.length < 3) return w;
  return w.substring(0, 2) + '*'.repeat(w.length - 4) + w.substring(11, 13);
}

export const showMessage = (title, type, placement = 'top', description = '', duration = 4000, onClose = () => {}, button) => {
  Toast.show({
    title,
    ...(description && { description }),
    ...(placement && { placement }),
    ...(placement === 'top' && { marginTop: 20 }),
    // height: '12',
    width: width * 0.8,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    duration,
    // backgroundColor: type === 'success' ? 'green.700' : type === 'warning' ? 'yellow.500' : type === 'error' ? 'red.700' : 'black',
    backgroundColor: '#2C99C6',
  }) 
}

