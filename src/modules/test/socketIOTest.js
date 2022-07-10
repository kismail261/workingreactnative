import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SocketIOClient from 'socket.io-client';

const socketIOTest = () => {
    const [messageInput, setInput] = useState('')
    const [messages, setMessages] = useState('')

    useEffect(() => {
        connectWebSocketWatch();
        return () => {
        }
    }, [])

    const connectWebSocketWatch = () => {
        //put your backend serve url here 
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbmFuYWxpLmNvbXNpYW5AZ21haWwuY29tIiwiX2lkIjoiNjE3YWI5ZDljNzNkYzAwMDE2MmFhOWYxIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjM4MDI0NTU2fQ.7h-QUvwd5ocuSD_wdlGY4YMMRPgA3YTdTJxRaQLUqzo"
        socket = SocketIOClient('https://api2.sporforya.com/',
            {
                transports: ['websocket'],
                query: `token=${token}`
            });
        socket.on('chat message', data => {
            var userMessageData = JSON.parse(data);
            var chatDataArray = [...messages];
            let message = [userMessageData];
            let newChatArray = message.concat(chatDataArray);
            setMessages(newChatArray)
            setInput('')
        });
    };
    const submitChatMessage = () => {
        socket.emit('chat message', messageInput);
        setInput('')
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Test Socket.io</Text>
        </View>
    )
}

export default socketIOTest

const styles = StyleSheet.create({})
