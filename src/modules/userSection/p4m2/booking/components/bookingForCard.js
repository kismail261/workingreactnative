import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { FONTS, ICONS, ImageUrl } from '../../../../../constant';
import { CheckBox } from '../../../../taxinformation/components/checkbox';


export const BookingForCard = props => {
  const { getValue } = props;
  const { _id, avatar, firstName, lastName } = props.data
  useEffect(() => {
    return () => {
    }
  }, [])

  return (
    <TouchableOpacity
      onPress={() => getValue(_id)}
      style={[styles.main,]}>
      <View style={[styles.row,]}>
        <View style={styles.innerRow}>
          <Image source={avatar != undefined ? { uri: ImageUrl + avatar } : ICONS.userIcon}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
            }} />
          <View
            style={{
              marginLeft: 11,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text style={[styles.name, { marginBottom: 3 }]}>
              {firstName} {lastName}
            </Text>
            <Text style={[styles.type]}>{'Child'}</Text>
          </View>
        </View>
        <View
          style={{
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CheckBox value={props.value.includes(_id)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderColor: '#15488F26',
    borderRadius: 4,
    height: 67,
    alignItems: 'center',
    marginVertical: 11,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  mainSelectionOff: {
    height: 67,
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'center',
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
  },
  name: {
    fontFamily: FONTS.SFBold,
    fontSize: 14,
    color: 'black',
  },

  type: {
    fontFamily: FONTS.SFRegular,
    fontSize: 13,
    color: '#707070',
  },
});



// import React, { useEffect } from 'react';
// import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
// import { FONTS, ICONS, ImageUrl } from '../../../../../constant';
// import { CheckBox } from '../../../../taxinformation/components/checkbox';


// export const BookingForCard = props => {
//   const { getValue } = props;
//   const { _id, avatar, firstName, lastName } = props.data
//   useEffect(() => {
//     return () => {
//     }
//   }, [])

//   return (
//     <View style={[styles.row,]}>
//       <View style={styles.innerRow}>
//         <Image source={avatar != undefined ? { uri: ImageUrl + avatar } : ICONS.userIcon}
//           style={{
//             height: 50,
//             width: 50,
//             borderRadius: 50,
//           }} />
//         <View
//           style={{
//             marginLeft: 11,
//             alignItems: 'flex-start',
//             justifyContent: 'center',
//           }}>
//           <Text style={[styles.name, { marginBottom: 3 }]}>
//             {firstName} {lastName}
//           </Text>
//           <Text style={[styles.type]}>{'Child'}</Text>
//         </View>
//       </View>
      
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   main: {
//     borderRadius: 4,
//     alignItems: 'center',
  
//     backgroundColor: 'white',
//     justifyContent: 'center',
//   },
//   row: {
//     width: '90%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   innerRow: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     width: '70%',
//   },
//   name: {
//     fontFamily: FONTS.SFBold,
//     fontSize: 14,
//     color: 'black',
//   },

//   type: {
//     fontFamily: FONTS.SFRegular,
//     fontSize: 13,
//     color: '#707070',
//   },
// });
