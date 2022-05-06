import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import{
  Button,
  useColorModeValue,  
  ScrollView,  
  Text,
  Input,
  Image,
  Box,
  View,
  SearchIcon,
  Icon,
} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';


const Profile = ({ navigation, route }) => {
  const userInfo = route.params.userInfo;
  const [photo, setPhoto] = React.useState(userInfo.photo||'https://picsum.photos/410');
  const [name, setName] = React.useState(userInfo.name);
  const [phone, setPhone] = React.useState (userInfo.phone); 
  const [about, setAbout] = React.useState(userInfo.about);

  const handleSave = () => {
    const newInfo = { ...userInfo };
    newInfo.Id = 1;
    newInfo.photo = photo;
    newInfo.name = name;
    newInfo.phone = phone;
    newInfo.about = about;
    route.params.saveUserData(newInfo);
    navigation.goBack();
  }
  const pickPicture = ()=>{
    const options = {
      title: 'Select your profile pic',
      storageOptions:{
        path: 'images',
        skipBackup:true,
      },
    }
    launchImageLibrary(options, response =>{
      if(response.errorCode){
        console.log(response.errorMessage);
      }else if(response.didCancel){
        console.log('Selection canceled')
      }else{
        const path = response.assets[0].uri;
        setPhoto(path);
      }
    });
  }


  return (
    <ScrollView bg={useColorModeValue("warmGray.50", "coolGray.800")}>
      <View>
        <Image source={{ uri: photo }} style={styles.image} alt='Profile pic' borderColor={useColorModeValue("warmGray.600", "cyan.200")}/> 
        <SearchIcon style={styles.close} color={useColorModeValue("cyan.700", "cyan.300")} onPress={ pickPicture }/> 
      </View> 
      
      <Box width='300' mx='auto'>            
        <Text style={styles.title} color={useColorModeValue("warmGray.700", "coolGray.300")}>{route.params.title}</Text>
        <Text style={styles.caption}>Name</Text>
        <Input
          value={name}
          placeholder="Name"
          placeholderTextColor={useColorModeValue("warmGray.500", "coolGray.400")}
          keyboardType="numeric"
          borderColor={useColorModeValue("warmGray.500", "cyan.200")}
          onChangeText={setName}
        />
        <Text style={styles.caption}>Phone</Text>
        <Input
          value={phone}
          placeholder="Phone number"
          placeholderTextColor={useColorModeValue("warmGray.500", "coolGray.400")}
          keyboardType="numeric"
          borderColor={useColorModeValue("warmGray.500", "cyan.200")}
          onChangeText={setPhone}
        />
        <Text style={styles.caption}>Description</Text>
        <Input
          value={about}  
          placeholder="Something about you"
          placeholderTextColor={useColorModeValue("warmGray.500", "coolGray.400")}
          borderColor={useColorModeValue("warmGray.500", "cyan.200")}
          onChangeText={setAbout}
        />
        <View>
          <Button onPress={handleSave} my={15}>Save changes</Button>
        </View>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    paddingTop: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  image: {
    marginTop: 30,
    marginBottom: 20,
    resizeMode: 'contain',
    width: 140,
    height: 140,
    borderRadius: 999,
    alignSelf: 'center',
    borderWidth: 2,
  },
  caption: {
    fontSize: 16,
    marginLeft: 12,
    margin: 6,
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 0,
    padding: 10,
  },
  close: {
    margin: 5,
    position: "absolute",
    top: 135,
    left: 245,
    width: 25,
    height: 25,
    borderRadius: 99,
  }
});

export default Profile;
