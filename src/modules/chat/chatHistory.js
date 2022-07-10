import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import io from 'socket.io-client';
import {useSelector} from 'react-redux';
import DetailHeader from './components/detailHeader';
import MsgInputField from './components/msgInputField';
import SenderMsg from './components/senderMsg';
import RecieverMsg from './components/recieverMsg';

var socket = null;

const chatHistory = props => {
  const scrollRef = useRef();
  const token = useSelector(state => state.user.token);
  const {_id} = useSelector(state => state.user.currentUser);
  const recieverId = props.route.params.recieverId;
  const recieverDetail = props.route.params.recieverDetail;

  const [history, setHistory] = useState([]);
  const [msgInput, setMsgInput] = useState('');

  useEffect(() => {
    socket = io('https://sfyapi.herokuapp.com', {
      transports: ['websocket'],
      query: `token=${token}`,
    });
    connectWebSocketWatch();
    scrollRef.current?.scrollToEnd({animated: true});
    return () => {};
  }, []);

  const getMsgInput = value => {
    setMsgInput(value);
  };

  const connectWebSocketWatch = async () => {
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat', onMessageReceived);
    socket.on('message_status', onMessageStatusReceived);
    socket.on('receive_old_messages', receive_old_messages);
    socket.emit('old_messages', {limit: 50, skip: 0, to: recieverId});
    socket.on('leave', onLeaveRoom);
    socket.on('join', onjoinRoom);
    socket.on('exception', onException);
  };

  function onException(data) {
    console.log('onException, ', data);
  }

  function onConnect(data) {
    console.log('connection successfully');
  }

  function onDisconnect(error) {
    console.log('onDisconnect: ', error);
  }

  function onMessageReceived(message) {
    socket.emit('message_status', {
      _id: message._id,
      senderId: message.senderId,
    });
    socket.emit('old_messages', {limit: 50, skip: 0, to: recieverId});
  }

  function onMessageStatusReceived(message) {
    // let temHistory = history;
    // temHistory.forEach((item, index) => {
    //     if (item._id == message._id) {
    //         temHistory[index].status = message.status
    //     }
    // })
    // setHistory(temHistory)
  }

  function receive_old_messages(data) {
    let tempMsg = data.docs.reverse();
    setHistory(tempMsg);
    scrollRef.current?.scrollToEnd({animated: true});
  }

  function sendMessage() {
    const payload = {
      receiverId: recieverId,
      message: msgInput,
    };
    socket.emit('message', payload);
    setMsgInput('');
    socket.emit('old_messages', {limit: 50, skip: 0, to: recieverId});
  }

  function onLeaveRoom(message) {
    // console.log(message);
  }

  function onjoinRoom(message) {
    // console.log(message);
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1, width: '100%', alignItems: 'center'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
    
      <View style={styles.container}>
        <DetailHeader navigation={props.navigation} data={recieverDetail} />
        <ScrollView
          ref={scrollRef}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({animated: true})
          }
          contentContainerStyle={{width: wp('100'), alignItems: 'center'}}>
          <View
            style={{
              width: wp('90'),
              justifyContent: 'flex-end',
              paddingBottom: 25,
            }}>
            {history.map((item, index) => {
              return (
                <View key={index}>
                  {_id == item.senderId ? (
                    <RecieverMsg data={item} />
                  ) : (
                    <SenderMsg data={item} />
                  )}
                </View>
              );
            })}
            <View style={{height: 70}} />
          </View>
        </ScrollView>
        <MsgInputField
          getMessagse={getMsgInput.bind(this)}
          value={msgInput}
          sendMessage={sendMessage.bind(this)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default chatHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    alignItems: 'center',
  },
});
