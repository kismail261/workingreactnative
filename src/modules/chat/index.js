import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import io from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import Header from './components/header';
import MsgItem from './components/msgItem';
import NoMsg from './components/noMsg';
import SporforyaMsgItem from './components/sporforyaMsgItem';
import OldMsgItem from './components/oldMsgItem';
import OldUnMsgItem from './components/oldUnMsgItem';
import {setLoader} from '../../redux/loader/loader.action';
import TNIndicator from '../../common/TNIndicator';
import {set} from 'react-native-reanimated';

var socket = null;

const index = props => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.loader.loader);
  const token = useSelector(state => state.user.token);
  const {_id} = useSelector(state => state.user.currentUser);
  const [conversationList, setConversationList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    dispatch(setLoader(true));
    socket = io('https://sfyapi.herokuapp.com', {
      transports: ['websocket'],
      query: `token=${token}`,
    });
    connectWebSocketWatch();
    return () => {};
  }, []);

  useEffect(() => {
    setFilteredList(conversationList);
    // console.log(filteredList);
  }, [conversationList]);

  const connectWebSocketWatch = async () => {
    socket.on('users', connectedUsers);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('conversations', conversation);
    socket.on('connect_error', onError);
    socket.on('reconnect_error', onError);
    socket.emit('users');
    socket.emit('conversations');
  };

  function connectedUsers(users) {
    // let allUsers = users;
    // allUsers.forEach(function (item) {
    // });
  }
  function onConnect() {}
  function onDisconnect(error) {}
  function conversation(data) {
    setConversationList(data);
    console.log('Data==================',data)
    dispatch(setLoader(false));
  }
  const filterMessages = searcText => {
    if (searcText != '') {
      setFilteredList(
        conversationList.filter(item =>
          item.senderId == _id
            ? item.sender.firstName && item.sender.lastName != undefined
              ? item.sender.firstName
                  .concat(item.sender.lastName)

                  .toLowerCase()
                  .indexOf(searcText.trim().toLowerCase()) > -1
              : null
            : item.sender.firstName && item.sender.lastName != undefined
            ? item.sender.firstName
                .concat(item.sender.lastName)

                .toLowerCase()
                .indexOf(searcText.trim().toLowerCase()) > -1
            : null,
        ),
      );
    } else {
      setFilteredList(conversationList);
    }
  };
  function onError(message) {}
  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        onPressSubmit={searcText => filterMessages(searcText)}
      />
      {loader ? (
        <TNIndicator />
      ) : (
        <>
          {filteredList.length == 0 ? (
            <NoMsg />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.itemContainer}>
                {filteredList.map((item, index) => {
                  return (
                    <View key={index}>
                      {item.receiverId == '61dc44682bd3b5420c753453' ||
                      item.senderId == '61dc44682bd3b5420c753453' ? (
                        <SporforyaMsgItem
                          navigation={props.navigation}
                          data={item}
                        />
                      ) : (
                        <MsgItem navigation={props.navigation} data={item} />
                      )}
                    </View>
                  );
                })}

                {/* <OldMsgItem navigation={props.navigation} />
                            <OldUnMsgItem navigation={props.navigation} />
                            <OldMsgItem navigation={props.navigation} />
                            <OldMsgItem navigation={props.navigation} />
                            <OldMsgItem navigation={props.navigation} />
                            <OldMsgItem navigation={props.navigation} />
                            <OldMsgItem navigation={props.navigation} />
                            <OldMsgItem navigation={props.navigation} />
                            <OldMsgItem navigation={props.navigation} /> */}
              </View>
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8FAFF',
  },
  itemContainer: {
    width: wp('100'),
    alignItems: 'center',
    marginBottom: 15,
  },
});
