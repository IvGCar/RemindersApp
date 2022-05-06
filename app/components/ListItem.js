import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button, useColorModeValue, Text, DeleteIcon} from 'native-base';


const ListItem = ({ reminder, deleteReminder, openDetails }) => {
  return (
    <TouchableOpacity onPress={() => openDetails(reminder)}>
      <View style={styles.item} borderBottomColor={useColorModeValue("gray", "coolGray.100")}>
        <Text style={styles.itemText} color={useColorModeValue("warmGray.700", "coolGray.300")}>{reminder.id} - {reminder.title}</Text>
        <Button
          bg='danger.700'
          onPress={() => deleteReminder(reminder)}
        ><DeleteIcon color={"white"}/></Button>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
  },
});

export default ListItem;
