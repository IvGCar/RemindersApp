import React from 'react'
import {useColorMode, Box, Button, useColorModeValue, MoonIcon, SunIcon} from 'native-base'

function UseColorMode() {
    const {toggleColorMode} = useColorMode();
    const color = useColorModeValue('info.100','warning.300');
    const icon = useColorModeValue(
    <MoonIcon size='5' color={color} onPress={toggleColorMode}/>,
    <SunIcon size='5' onPress={toggleColorMode} color={color}/>);
    return <Box>             
              {icon}
            </Box>;
  }

export default UseColorMode
// {useColorModeValue(<MoonIcon size='5'/>,<SunIcon size='5'/>)}