import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ButtonRegular from '../../../common/meduimBtnBorder';
import Header from '../../../common/headerBL';
import { FONTS, } from '../../../constant';
import { MyChildCard } from './components/MyChildCard';
import { DeleteChildModal } from './deleteChild';
import { useDispatch, useSelector } from 'react-redux';
import { getChildList } from '../../../redux/profile/profile.action';
import axios from 'axios';
import { Url } from '../../../constant/baseURL';
import TNIndicator from '../../../common/TNIndicator';
import { AddChildNotifier } from '../addChildNotifier';
import { showMessage } from '../../../helpers/replaceDigitsWithAesteriks';


export const MyChildren = (props) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token);
  const currentUser = useSelector(state => state.user.currentUser);
  const childList = useSelector(state => state.profile.childList);
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    dispatch(getChildList(token, currentUser._id))
    return () => {
    }
  }, [])

  const deleteChild = async (id) => {
    setLoader(true)
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    await axios
      .delete(`${Url}api/child/${id}`, {
        headers: headers,
      })
      .then(resp => {
        let response = resp.data;
        showMessage("Delete successfully!")
        dispatch(getChildList(token, currentUser._id))
        setLoader(false)
      })
      .catch(error => {
        const err = error;
        if (err.response) {
          showMessage(err.response.data.message);
        }
        setLoader(false)
      });
  };

  return (
    <>
      {childList.length == 0
        ?
        <AddChildNotifier navigation={props.navigation} />
        :
        <View style={styles.main}>
          <Header label={"My Children"} navigation={props.navigation} />
          <View style={styles.view}>
            {
              childList.map((item, index) => {
                return (
                  <MyChildCard key={index} data={item} navigation={props.navigation} deleteChild={deleteChild.bind(this)} />
                )
              })
            }
          </View>
          <View style={{ width: '80%', marginTop: 20 }}>
            <ButtonRegular label="Add a child" onClick={() => props.navigation.navigate("AddChild", { type: '1' })} />
          </View>
          <DeleteChildModal visible={false} />
          {
            loader
              ?
              <TNIndicator />
              :
              null
          }
        </View>
      }
    </>

  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  img: {
    width: 165.81,
    height: 114.84,
    marginBottom: 32,
  },
  title: {
    fontFamily: FONTS.SFBold,
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
  },
  view: {
    width: '80%',
    marginTop: 20,
  },
});
