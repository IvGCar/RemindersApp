import React from 'react'
import {  
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button, 
  Stack, 
  Box, 
  Image,
  useColorModeValue,
  Text,
  VStack,
  Input,
  SearchIcon
} from 'native-base';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

   
/*
REMINDER 
id: int
title: string
notes: string
time: date - timestamp
*/


const Home = ({ navigation, name = 'Ivan' }) => {
  const [reminders, setReminders] = React.useState([])
  const [userData, setuserData] = React.useState([])
  const [data, setdata] = React.useState({
    searchText: "",
    filteredData: []
  })
  // USE FOLLOWING TO DELETE PREVIOUS USER INFO
  // const removeItemValue = async (key) => {
  //   try {
  //       await AsyncStorage.removeItem(key);
  //       return true;
  //   }
  //   catch(exception) {
  //       return false;
  //   }
  // }
  // removeItemValue("User-Info")

  React.useEffect(() => {
    getData("Reminders-Data")
      .then((value) => {
        console.log("VALUE", value)
        if (!!value) { setReminders(value) }
      })
      .catch((e) => console.log("ERROR", e))
  }, [])

  React.useEffect(()=>{
    getData("User-Info")
      .then((value) => {
        console.log("VALUE", value)
        if (!!value) { setuserData(value) }
      })
      .catch((e) => console.log("ERROR", e))
  }, [])

  const search = (searchText) => {
    setdata({searchText: searchText});
    let filteredData = reminders.filter(function (item) {
      return item.title.toLowerCase().includes(searchText.toLowerCase());
    });
  
    setdata({filteredData: filteredData});
    console.log(data);
  };

  const deleteReminder = (reminder) => {
    const newReminders = reminders.filter(item => item.id !== reminder.id)
    setReminders(newReminders)
    storeData(newReminders, 'Reminders-Data')
  }

  const saveReminder = (reminder) => {
    const newReminders = reminders.map(r => {
      if (r.id === reminder.id) { return reminder }
      else {return r}
    })
    if(reminders.find(elem=>elem.id===reminder.id)===undefined){
      newReminders.push(reminder)
    }
    setReminders(newReminders)
    storeData(newReminders, 'Reminders-Data') 
  }

  const openReminder = (reminder) => {
    if(reminder === undefined){
      const newId = !!reminders.length ? (reminders[reminders.length - 1].id + 1) : 1
      const newItem = {
        id: newId,
        title: 'New Reminder',
        notes: 'Details',
        time: new Date()
      }
      navigation.navigate('Details', {
        reminder: newItem,
        saveReminder: saveReminder,
      })
    }else{
      navigation.navigate('Details', {
        reminder: reminder,
        saveReminder: saveReminder,
      })
    }
  }

  const storeData = async (value, dataSet) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(dataSet, jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async (DataName) => {
    try {
      const jsonValue = await AsyncStorage.getItem(DataName)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }

  const saveUserData = (newData) =>{
    const updatedInfo = userData.map(r => { return newData  })
    if(userData.length===0){
      updatedInfo.push(newData)
    }
    setuserData(updatedInfo);
    storeData(updatedInfo, "User-Info")
  }
  const openUserInfo = () =>{
    if(userData[0]===undefined){
      const newInfo = {
        name: 'Your Name',
        phone: "0000",
        about: 'About you'
      }
      navigation.navigate("Profile", {
        userInfo: newInfo,
        saveUserData: saveUserData,
        title: "My Profile Info"
      })
    }else{
      navigation.navigate("Profile", {
      userInfo: userData[0],
      saveUserData: saveUserData,
      title: "My Profile Info"
      })
    }
    
  }  

  return (
    <Box bg={useColorModeValue("warmGray.50", "coolGray.800")} style={styles.container}>
      <Pressable onPress={() =>
          openUserInfo()}
      >
        <Image source={userData[0]? {uri: userData[0].photo}:{ uri: 'https://picsum.photos/410' }}           
          alt='Profile pic'
          borderRadius={100}
          style={styles.image}
          borderColor={useColorModeValue("warmGray.600", "cyan.200")}
        />
      </Pressable>
      <Text style={styles.title}>Welcome {userData[0]? userData[0].name: "User"}</Text>
      <Stack mb="2.5" mt="3" direction={{
        base: "column",
        md: "row"
      }} space={2} mx={{
        base: "auto",
        md: "0"
      }}>       
        <Button size='sm' colorScheme='tertiary'
          onPress={() => openReminder()}
        >Add Remidner</Button>
      </Stack>
      <View style={styles.listContainer}>        
        <VStack w="80%" space={5} alignSelf="center">
          <Input placeholder="Search..." variant="filled" width="100%" borderRadius="10" py="1" px="2" borderWidth="0" 
          InputLeftElement={<SearchIcon color={useColorModeValue("cyan.700", "cyan.300")} mx={2}/>} 
          onChangeText={search} value={data.searchText} autoCapitalize='none'/>
        </VStack>      
        <FlatList
          data={data.filteredData && data.filteredData.length > 0 ? data.filteredData : reminders}
          keyExtractor={(item) => `item-${item.id}`}
          renderItem={({ item }) => <ListItem
            reminder={item}
            deleteReminder={deleteReminder}
            openDetails={openReminder}
          />}
        />
      </View>     
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    borderWidth: 2,
  },
  listContainer: {
    flex: 1,
  },  
})

export default Home
