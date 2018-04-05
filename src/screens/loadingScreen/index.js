import React, { Component } from 'react';
import firebase from 'firebase';
import { View, ActivityIndicator } from 'react-native';
import commonColor from '../../../theme/commonColor'

export default class LoadingScreen extends Component {

    
    componentDidMount = async () => {
        await firebase.auth().onAuthStateChanged(user => {
            console.log(user)
            if (user) {
                let uid = user.uid
                firebase.database().ref('userInformation').child(uid).once('value')
                .then (res => {
                    
                    if (res) {
                        this.props.navigation.navigate('Home', {uid})
                    } else {
                        this.props.navigation.navigate('FinishProfile', {uid})
                    }
                })
            } else {
                this.props.navigation.navigate('Login')
            }
        })
    }

    render = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator
                    size="large"
                    color={commonColor.brandPrimary}
                />
            </View>
        )
    }
}