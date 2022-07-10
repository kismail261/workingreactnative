import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { decode } from 'base64-arraybuffer'
import axios from 'axios'
import fs from 'react-native-fs';
import S3 from 'aws-sdk/clients/s3';
import { useSelector } from 'react-redux'
import { Url } from '../../constant/baseURL'
import { showMessage } from '../../helpers/replaceDigitsWithAesteriks'

const sThreeBucketTest = () => {
    const token = useSelector(state => state.user.token)

    const chooseImage = async () => {
        let options = {
            title: 'Upload Prescription',
            takePhotoButtonTitle: 'Take a Photo',
            chooseFromLibraryButtonTitle: 'Select From Gallery',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };
        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
                showMessage(response.customButton);
            } else {
                // if (Platform.OS !== 'android') {
                //     if (imageObject && imageObject.uri) {
                //         imageObject.uri.replace('file://', '');
                //     }
                // }
                const file = {
                    path: response.assets[0].uri,
                    name: response.assets[0].fileName,
                    type: response.assets[0].type,
                };
                getSignedUrl(file, token)
            }
        });
    };

    const getSignedUrl = (data, token) => {
        let { type, name, path } = data
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        axios.get(`${Url}api/file-upload/presigned-url?type=${type}&name=${name}&path=${path}`,
            { headers: headers }
        ).then(resp => {
            let response = resp.data
            imageUpload(response.signedUrl, data)
        }).catch(error => {
            const err = error
            if (err.response) {
                showMessage(err.response.data.message)
            }
        });
    }

    const imageUpload = (signedUrl, file) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send({ uri: file.path, type: file.type, name: file.name });
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                let percentComplete = event.loaded / event.total;
                console.log("percentComplete: ", percentComplete)
            } else { }
        });
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Image successfully uploaded to S3');
                } else {
                    console.log('Error while sending the image to S3')
                }
            }
        }
    }






    const uploadImageOnS3 = async (file) => {
        const s3bucket = new S3({
            accessKeyId: 'AKIA3PPRWJMHFJWH7LRQ',
            secretAccessKey: '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',
            Bucket: 'sporforya',
            signatureVersion: 'v4',
        });
        let contentType = 'image/jpeg';
        let contentDeposition = 'inline;filename="' + file.name + '"';

        const base64 = await fs.readFile(file.uri, 'base64');
        const arrayBuffer = decode(base64);

        s3bucket.createBucket(() => {
            const params = {
                Bucket: 'sporforya',
                Key: file.name,
                Body: arrayBuffer,
                ContentDisposition: contentDeposition,
                ContentType: contentType,
            };
            s3bucket.upload(params, (err, data) => {
                if (err) {
                    console.log('error in callback');
                    console.log(err)
                }
                console.log('success');
                console.log("Respomse URL : " + data);
            })
        })
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <TouchableOpacity onPress={() => chooseImage()} style={{ width: 150, height: 45, backgroundColor: 'red', }} >

            </TouchableOpacity>
        </View>
    )
}

export default sThreeBucketTest

const styles = StyleSheet.create({

})
