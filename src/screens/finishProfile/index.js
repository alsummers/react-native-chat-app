import React from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { ImagePicker } from 'expo'
import styles from './styles'
import firebase from 'firebase'

export default class FinishProfile extends React.Component {

    constructor(props){
        super(props)
        this.state={
            image: ''
        }
        this.uid = this.props.navigation.state.params.uid
    }

    takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        })

        if(!pickerResult.cancelled) {
            this.setState({image: pickerResult.uri})
        }
    }
    pickPhoto = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        })
            if(!pickerResult.cancelled) {
                this.setState({image: pickerResult.uri})
            }
        
    }
    uploadButtonPressed = async () => {
        let uploadResponse, uploadResult;
        let uid = this.uid
    
        try {
            uploadResponse = await this.uploadPhoto(this.state.image);
            console.log(this.state.image)
            uploadResult = await uploadResponse.json();
            let imageUrl = JSON.stringify(uploadResult.location)
            imageUrl = imageUrl.replace(/"/g,'')
            console.log({ uploadResponse });
            console.log({ uploadResult });
            firebase.database().ref('userInformation').child(uid).child('profImage').set(imageUrl)
.then(() => {

    this.props.navigation.navigate('Home', {uid} )
    

})
    
        } catch (e) {
            console.log({ uploadResponse });
            console.log({ uploadResult });
            console.log({ e });
            alert('Upload failed, please try again.');
        };
    }
    uploadPhoto = async(uri) => {
        let apiUrl = 'https://file-upload-example-backend-dhfjhadnlo.now.sh/upload';
    
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
    
        let formData = new FormData();
        formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
        });
    
        let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        };
    
        return fetch(apiUrl, options);
    }
    render () {

        let {image} = this.state;
        return (
            <View style={styles.container}>
            {{image} && 
                <Image source={{uri: image}} style={{ width: 250, height: 250 }} />
            }
            <View> 
    {image   ?  
        <View style={styles.buttons}>
            <TouchableHighlight 
                style = {[styles.deletePhotoBtn, styles.button]}
                onPress = {() => this.setState({ image: ''})}>
                <Text style = {{textAlign: 'center'}}>Delete Photo</Text>
            </TouchableHighlight>
            <TouchableHighlight 
                style = {styles.takePhotoBtn}
                onPress = {() => this.uploadButtonPressed()}>
                <Text style = {{textAlign: 'center'}}>Upload Photo</Text>
            </TouchableHighlight>
        </View>
        :
        <View style={styles.buttons}>
            <TouchableHighlight 
                style = {styles.takePhotoBtn}
                onPress = {() => this.takePhoto()}>
                <Text style = {{textAlign: 'center'}}>Take Photo</Text>
            </TouchableHighlight>
            <TouchableHighlight 
                style = {styles.pickPhotoBtn}
                onPress = {() => this.pickPhoto()}>
                <Text style = {{textAlign: 'center'}}>Select Photo</Text>
            </TouchableHighlight>
        </View>
    }
</View>
            </View>
            
        )
    }
}