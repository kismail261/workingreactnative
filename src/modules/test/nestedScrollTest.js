import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            content: {}
        };
    }

    render() {
        return (
            <ScrollView contentContainerStyle={this.state.content}
            >
                <View style={{ backgroundColor: 'red' }} >
                    <View style={{ height: 400, backgroundColor: 'blue' }} />
                    <ScrollView
                        // onTouchStart={(ev) => { this.setState({ content: { flex: 1 } }); }}
                        // onMomentumScrollEnd={(e) => { this.setState({ content: {} }); }}
                        // onScrollEndDrag={(e) => { this.setState({ content: {} }); }}
                        style={{ margin: 10, maxHeight: 200 }} >
                        <View style={{ height: 200, backgroundColor: 'blue' }} />
                        <View style={{ height: 200, backgroundColor: 'pink' }} />
                    </ScrollView>

                </View>
                <View style={{ height: 300, backgroundColor: 'blue' }} />
                <View style={{ height: 300, backgroundColor: 'blue' }} />
            </ScrollView>
        );
    }
}
