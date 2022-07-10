import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { ButtonRegular } from '../../common/btnRegular';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import TNActivityIndicator from '../../common/TNIndicator';
import { FONTS, ICONS, Url } from '../../constant';
import { getUserDetail } from '../../redux/user/user.action';
import Header from './components/headerBL';
import ICON from 'react-native-vector-icons/AntDesign'
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks';





export const GetSpotyPoints = (props) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)
  const currentUser = useSelector(state => state.user.currentUser)
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(false)
  const [modalVisible,setModalVisible]=useState(false)
  const width = Dimensions.get('window').width;

  const sendInvite = async () => {
    if (email == "") {
      showMessage("Code field should not be blank")
    } else {
      setLoader(true)
      let headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      let data = {
        "referralCode": email
      }
      axios.post(`${Url}api/refer`, data, { headers: headers })
        .then(resp => {
          let response = resp.data
          console.log("sendInvite: ", response)
          dispatch(getUserDetail(currentUser._id))
          setModalVisible(true)
          setLoader(false)
          setEmail('')
        })
        .catch(error => {
          const err = error
          if (err.response) {
            showMessage(err.response.data.message)
          }
          setLoader(false)
        });
    };
  };

  const getEmail = (value) => {
    let removeSpace = value.replace(/ /g, '')
    setEmail(removeSpace)
  }


  return (
    <View style={styles.main}>
      <Header navigation={props.navigation} label='Sporty Points' />

      <View style={{ width: '80%', marginTop: 30 }}>
        <Text style={styles.head}>Collect Sporty Points</Text>
      </View>
      <View style={{ width: '80%', marginTop: 11 }}>
        <Text style={styles.desc}>
          Collect sporty points using referral code, sent by friend in your email, and earn 1000 sporty points to spend on
          Sporforya! Terms apply
        </Text>
      </View>
      <View style={{ width: '80%', marginTop: 22 }}>
        <TextInput
          style={styles.ti}
          placeholder="Enter Referral Code"
          placeholderTextColor={"#707070"}
          onChangeText={(value) => getEmail(value)}
          value={email}
        />
      </View>
      <View style={{ marginTop: 12 }}>
        <ButtonRegular title="Collect" bgColor={"#75CB36"} onClick={sendInvite} />
      </View>

      <View style={styles.imgCont}>
        <Image source={ICONS.refer} style={styles.img} resizeMode='contain' />
      </View>

      {
        loader
          ?
          <TNActivityIndicator />
          :
          null
      }



      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
     <View style={{flex:1,justifyContent:'space-evenly'}}>
       <View style={styles.Headerstyle}>
         <ICON name='arrowleft' size={30} color={'black'} onPress={()=>{setModalVisible(false)}}/>
         <Text style={styles.textStyle}> Referal Rewards</Text>
         <ICON name='close' size={30} color={'black'} onPress={()=>{setModalVisible(false)}}/>
       </View>
       <View
  style={{
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    // marginTop:'2%',
    opacity:0.1
  }}
/>
<Image source={require('../../assets/images/ReferalReward.png')} resizeMode='contain' style={{width:width}}/>

<View style={{alignItems:'center',marginBottom:'5%',alignSelf:'center'}}>
  <Text style={styles.Textprops}>You have</Text>
  <Text style={styles.Textprops1}>1000</Text>
  <Text style={styles.Textprops}>Sporty Points!</Text>
</View>


        <ButtonRegular  txts title="Learn More About Sporty Points" white buttonStyle={{ marginBottom: 10,alignSelf:'center' }}/>
        <ButtonRegular title="Ok" blue buttonStyle={{ marginBottom: 10,alignSelf:'center' }} onClick={() => setModalVisible(false)} />
          
        </View>
      </Modal>
      {/* <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableOpacity> */}
    </View>
  
      
    

    
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#21D17F',
  },
  head: {
    fontFamily: FONTS.SFBold,
    fontSize: wp('6'),
    color: '#FFFFFF',
  },
  desc: {
    fontFamily: FONTS.SFRegular,
    fontSize: wp('4'),
    color: '#FFFFFF',
  },
  link: {
    fontFamily: FONTS.SFBold,
    color: 'white',
    fontSize: wp('4'),
  },
  ti: {
    borderColor: '#70707026',
    borderWidth: 1,
    borderRadius: 4,
    height: 46,
    padding: 10,
    backgroundColor: 'white',
    fontSize: wp('3.5'),
    color: '#000000',
    fontFamily: FONTS.SFRegular
  },
  linkTxt: {
    color: '#707070',
    opacity: 0.5,
    fontSize: wp('3.5'),
    fontFamily: FONTS.SFRegular,
  },
  imgCont: {
    bottom: 0,
    width: '100%',
    marginTop: hp('21')

  },
  img: {
    height: wp('50'),
    width: wp('100'),
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:wp('5'),
    fontFamily: FONTS.SFRegular,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  Headerstyle:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:'4%',
    marginHorizontal:'3%'


  },
  Textprops:{
    fontSize: wp('6'),
    fontFamily: FONTS.SFMedium,
    color: 'black',
    fontWeight:'700'
  },
  Textprops1:{
    fontSize: wp('14'),
    fontFamily: FONTS.SFMedium,
    color: '#2C99C6',
    fontWeight:'700'
  },
  
});
