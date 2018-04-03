import React from 'react'
import firebase from 'firebase'
import { Text, TextInput, TouchableHighlight, View } from 'react-native'
import styles from './styles'

export default class Landing extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            signinEmail: '',
            signinPassword: '',
            signupEmail: '',
            signupPassword: '',
            signupConfirmPassword: '',            
            username: '',
        }
    }
    signup() {
        if(this.state.signupPassword == this.state.signupConfirmPassword){
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.signupEmail, this.state.signupPassword)
            .then(res => {
                let uid = res.uid
                let userInfo = {
                    username: this.state.signupUsername
                }
                firebase.database().ref('userInformation/').child(uid).set(userInfo)
                this.props.navigation.navigate('FinishProfile')
            }).catch(res => {
                console.log('error', res)
            })
        }
    }
    signin() {
        firebase.auth().signInWithEmailAndPassword(this.state.signinEmail, this.state.signinPassword)
        .then(res => {
            this.props.navigation.navigate('FinishProfile')
        }).catch(res => {
            console.log('error', res.code)
        })
    }
    render () {
        return (
            <View>
                <View style = {styles.view}>
                    <Text>Signup!</Text>
                    <TextInput onChangeText = {(text) => this.setState({signupEmail: text})}
                    style = {styles.textInput} placeholder = {'Email'} />
                    <TextInput onChangeText = { (text) => this.setState({signupUsername: text})}
                    style = {styles.textInput}
                    placeholder = {'Username'} />
                    <TextInput
                    onChangeText = {(text) => this.setState({signupPassword: text})}
                    style = {styles.textInput}
                    secureTextEntry = {true}
                    placeholder = {'Password'}
                />
                <TextInput
                    onChangeText = {(text) => this.setState({signupConfirmPassword: text})}
                    secureTextEntry = {true}
                    style = {styles.textInput}
                    placeholder = {'Confirm Password'}
                />
                 <TouchableHighlight underlayColor={styles.touchable.backgroundColor} style = {styles.btn} onPress = {() => this.signup()}>
            <Text style = {styles.text}>SignUp</Text>
    </TouchableHighlight>
            </View>
            <View style={styles.view}>
            <Text>SignIn</Text>
    <TextInput
        onChangeText = {(text) => this.setState({signinEmail: text})}
        style = {styles.textInput} placeholder = {'Email'}
    />
    <TextInput
        onChangeText = {(text) => this.setState({signinPassword: text})}
        secureTextEntry = {true}
        style = {styles.textInput}
        placeholder = {'Password'}
    />
    <TouchableHighlight underlayColor={styles.touchable.backgroundColor} style = {styles.btn} onPress = {() => this.signin()}>
            <Text style = {styles.text}>Signin</Text>
    </TouchableHighlight>
            </View>
        </View>


        )
    }
}