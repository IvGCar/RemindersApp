import React, { useState } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import{
  Button,
  useColorModeValue,
  ScrollView,
  Input,
  Text,
  HStack
} from 'native-base'

const Details = ({ navigation, route }) => {
  const reminder = route.params.reminder
  const [title, setTitle] = useState(reminder.title)
  const [notes, setNotes] = useState(reminder.notes)
  const [date, setDate] = useState(reminder.time);

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode, theme) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange : dateChange,
      mode: currentMode,
      is24Hour: true
    })
  };
  
  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleSave = () => {
    const newReminder = { ...reminder }
    newReminder.id = 1
    newReminder.title = title
    newReminder.notes = notes
    newReminder.time = date
    route.params.saveReminder(newReminder)
    navigation.goBack()
  }


  return (
    <ScrollView style={styles.container} bg={useColorModeValue("warmGray.50", "coolGray.800")}>
      <View style={styles.form}>
        <Text style={styles.title} my={15}>Reminder Details</Text>
        <Text style={styles.caption}>Title</Text>
        <Input
          value={title}
          onChangeText={setTitle}
          placeholder="Awsome title"          
          placeholderTextColor={useColorModeValue("warmGray.500", "coolGray.400")}
          borderColor={useColorModeValue("warmGray.500", "cyan.200")}
        />
        <Text style={styles.caption}>Notes</Text>
        <Input
          style={styles.textArea}
          multiline
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top"
          numberOfLines={5}
          placeholder="Write something here..."          
          placeholderTextColor={useColorModeValue("warmGray.500", "coolGray.400")}
          borderColor={useColorModeValue("warmGray.500", "cyan.200")}
        />
        <HStack w="100%" space={10} justifyContent="center">
          <View>    
            <Button onPress={showDatepicker} mt={15}>Pick date</Button>
          </View>
          <View>          
            <Button onPress={showTimepicker} my={15}>Pick time</Button>
          </View>
        </HStack>
        <Text style={styles.caption}>Date selected: {date.toLocaleString()}</Text>
      </View>
        <Button onPress={handleSave} w="55%" alignSelf={"center"}>Save Reminder</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    },
  form: {
    padding: 12,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
  },
  caption: {
    fontSize: 16,
    marginLeft: 12,
    marginBottom: 4,
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 0,
    padding: 10,
  },
  textArea: {
    marginTop: 0,
    marginLeft: 0,
  },
});

export default Details
