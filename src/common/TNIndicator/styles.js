import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(52, 52, 52, 0.1)",
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    },
    indicatorContainer: {
        width: 180,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    text: {
        color: '#000000',
        fontSize: 15,
        marginTop: 20,
    },
});

export default styles;