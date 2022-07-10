import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../../constant';

export const Dropdown = ({name, children}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity style={styles.main} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.btnText}>{name ?? 'Select'}</Text>
        {!isOpen && <Icon name="chevron-forward-outline" size={10} />}
        {isOpen && <Icon name="chevron-down-outline" size={10} />}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.childView}>
          <ScrollView nestedScrollEnabled style={{width: '100%'}}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              {children}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 46,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#70707026',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  btnText: {
    color: '#707070',
    fontFamily: FONTS.SFRegular,
    fontSize: 14,
  },
  childView: {
    height: 180,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 4,
    borderColor: '#70707026',
    backgroundColor: 'white',
  },
});
