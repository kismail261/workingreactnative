import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../../../constant';

export const ExpandableView = ({
  children,
  style,
  title,
  openByDefault,
  hideIcons,
}) => {
  useEffect(() => {
    if (openByDefault) setOpen(openByDefault);
  }, []);
  const [open, setOpen] = useState(false);
  return (
    <View style={{
      borderBottomWidth: 0.7, 
      borderBottomColor: 'rgba(112, 112, 112, 0.3)',
      marginBottom:9
      }} >
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.header}>
        <View
          style={{
            width: '87%',
            justifyContent: 'center',
          }}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {!hideIcons && (
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            {!open && (
              <Image
                source={ICONS.nextDate}
                style={{ height: 10.08, width: 5.75 }}
              />
            )}
            {open && (
              <Image
                source={ICONS.downArrow}
                style={{ width: 10.08, height: 5.75 }}
              />
            )}
          </View>
        )}
      </TouchableOpacity>
      {open && <View style={style}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: wp('4.5'),
    color: 'black',
    fontFamily: FONTS.SFBold,
  },
});
