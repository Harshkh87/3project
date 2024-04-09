import React, { useEffect, useState } from 'react'
import Navbar from "../navbar"
import {
  Heading, Input, VStack, Box, Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark, Tooltip, Text, HStack, Select, Stack, Flex, useColorMode, Button, Radio, RadioGroup
} from '@chakra-ui/react'
// import './style.css'
import { BiRupee } from 'react-icons/bi';

function index() {
  //slider
  // const { colorMode } = useColorMode();
  const [showTooltip, setShowTooltip] = React.useState(false)

  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState(5);
  const [gstAmount, setGstAmount] = useState(0);
  const [sgstAmount, setSGstAmount] = useState(0);
  const [igstAmount, setIGstAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [yourState, setYourState] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [Rate, setRate] = useState(5);
  const [Addgst, setAddgst] = React.useState(true)

  const optionsMap = new Map([
    ['option1', '	Andhra Pradesh'],
    ['option2', 'Arunachal Pradesh'],
    ['option3', 'Assam'],
    ['option4', 'Bihar'],
    ['option5', 'Chhattisgarh'],
    ['option6', 'Goa'],
    ['option7', 'Gujarat'],
    ['option8', 'Haryana'],
    ['option9', 'Himachal Pradesh'],
    ['option10', 'Jharkhand'],
    ['option11', 'Karnataka'],
    ['option12', 'Kerala'],
    ['option13', 'Madhya Pradesh'],
    ['option14', 'Maharashtra'],
    ['option15', 'Manipur'],
    ['option16', 'Meghalaya'],
    ['option17', 'Mizoram'],
    ['option18', 'Nagaland'],
    ['option19', 'Odisha'],
    ['option20', 'Punjab'],
    ['option21', 'Rajasthan'],
    ['option22', 'Sikkim'],
    ['option23', 'Tamil Nadu'],
    ['option24', 'Telangana'],
    ['option25', 'Tripura'],
    ['option26', 'Uttar Pradesh'],
    ['option27', 'Uttarakhand'],
    ['option28', 'West Bengal']
  ]);

  const handleGST = (value) => {
    // console.log('add gst',value);
    setAddgst(value)
  }

  const handleYourStateChange = (event) => {
    const value = event.target.value;
    setYourState(value);
  };

  const handleCustomerStateChange = (event) => {
    const value = event.target.value;
    setCustomerState(value);
  };


  // const handleState = () => {
  //   // console.log(yourState);
  //   // console.log(customerState)
  //   if (yourState === customerState) {
  //     console.log('if',sgstAmount,igstAmount)
  //     setSGstAmount(gstAmount / 2)
  //     setIGstAmount(0)
  //   }
  //   else {
  //     console.log('else',sgstAmount,igstAmount)
  //     setSGstAmount(0)
  //     setIGstAmount(gstAmount)
  //   }
  // }

  const handleAmountChange = (e) => {
    const newAmount = parseFloat(e.target.value);
    // console.log(newAmount)
    setAmount(newAmount || '');
  };

  const handleInput = (e) => {
    // console.log(e.target.value);
    const newRate = e.target.value;
    setRate(newRate);
    setGstRate(newRate);
  }

  const handleSliderChange = (value) => {
    // console.log(value)
    setGstRate(value);
    setRate(value);                                                       // slider move
  };

  useEffect(() => {
    if (Addgst === 'true') {
      // handleState();
      calculateGst();
    } else {
      // handleState();
      removeGST(); 
    }
  }, [ yourState, customerState]);
  


  // calculate 
const calculate = () => {

  if (Addgst === 'true') {
    calculateGst();
  } else {
    removeGST();
  }
  // handleState();
}

  const calculateGst = () => {
    const calculatedGst = (amount * gstRate) / 100;
    const calculatedTotal = amount + calculatedGst;
    // console.log(calculatedTotal)
    setGstAmount(calculatedGst);
    setTotalAmount(calculatedTotal);
    if (yourState === customerState) {
          console.log('if',sgstAmount,igstAmount)
          setSGstAmount(calculatedGst  / 2)
          setIGstAmount(0)
        }
        else {
          console.log('else',sgstAmount,igstAmount)
          setSGstAmount(0)
          setIGstAmount(calculatedGst)
        }
  };

  const removeGST = () => {
    const calculatedGst = amount - [amount * (100/(100+gstRate))]
    const calculatedTotal = amount - calculatedGst;
    // console.log(calculatedTotal)
    setGstAmount(calculatedGst);
    setTotalAmount(calculatedTotal);
    if (yourState === customerState) {
      // console.log('if',sgstAmount,igstAmount)
      setSGstAmount(calculatedGst  / 2)
      setIGstAmount(0)
    }
    else {
      // console.log('else',sgstAmount,igstAmount)
      setSGstAmount(0)
      setIGstAmount(calculatedGst)
    }
  }
  return (
    <div>
      <Navbar />
      <Flex
        flexDirection="column"
        width="100wh"
        height="80vh"
        alignItems="center"
      // border={'2px solid red'}
      >
        <Stack
          flexDir="column"
          mb="2"
          alignItems="center"
        >
          <Heading
            p='5'
            fontWeight='extrabold'
            size='xl'
            bgGradient='linear(to-l, teal.300, blue.500)'
            bgClip='text'
          >
            GST Calculator
          </Heading>
          <Flex
            // border={'1px solid black'}
            minW={{ base: "300px", sm: "400px", md: "600px" }}
            px={"30px"}
            width={"full"}
            flexDirection={{ base: "column" }}

          >
            <Stack gap={{ base: "10px", lg: "100px" }} pb={"30px"} direction={{ base: "column", lg: "row" }}>
              <HStack gap={"20px"}>
                <Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>Your State</Text>
                <Select
                  placeholder='Select option'
                  onChange={handleYourStateChange}
                  value={yourState}
                >
                  {[...optionsMap].map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </HStack>
              <HStack gap={"20px"}>
                <Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}
                >Customer State</Text>
                <Select
                  placeholder='Select option'
                  onChange={handleCustomerStateChange}
                  value={customerState}
                >
                  {[...optionsMap].map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </HStack>
            </Stack>

            <Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }} pb={"10px"}>Cost of Goods / Services</Text>
            <Stack direction={{ base: "column", lg: "row" }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                h="64px"
                bg="#fff"
                border=" 1px solid #0b70e7"
                boxShadow="0 0 12px rgb(0 0 0 / 6%)"
                w={{ base: "auto", lg: "80%" }}
                color="#505050"
                fontSize="24px"
                borderRadius="4px"
                p="1px"
                marginBottom={"2vh"}
              >
                <BiRupee size={"50px"} />
                <Box as='input' type="number" placeholder="Enter Amount Here"
                  value={amount} border={'none'} outline={'none'}
                  onChange={handleAmountChange} bg={'white'} _placeholder={{ color: 'gray.800' }}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                h="64px"
                ml={{ base: "0px", lg: "40px" }}
                bg="#fff"
                border=" 1px solid #0b70e7"
                // boxShadow="0 0 12px rgb(0 0 0 / 6%)"
                w="25%"
                color="#505050"
                fontSize="24px"
                borderRadius="4px"
                p="1px"
                marginBottom={"2vh"}
              >
                <Box as='input' type="number"
                  border={'none'} outline={'none'}
                  bg={'white'} _placeholder={{ color: 'gray.800' }}
                  w={"20%"}
                  placeholder='%'
                  value={Rate}
                  textAlign={'center'}
                  onChange={handleInput}
                />
              </Box>
            </Stack>
            <Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }} pb={"10px"}>Rate of GST</Text>
            <Slider
              pt={"1%"}
              id='slider'
              min={0}
              max={28}
              colorScheme='teal'
              value={gstRate}
              onChange={(value) => handleSliderChange(value)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
                0
              </SliderMark>
              <SliderMark value={5} mt='1' ml='-2.5' fontSize='sm'>
                5
              </SliderMark>
              <SliderMark value={9} mt='1' ml='-2.5' fontSize='sm'>
                9
              </SliderMark>
              <SliderMark value={14} mt='1' ml='-2.5' fontSize='sm'>
                14
              </SliderMark>
              <SliderMark value={19} mt='1' ml='-2.5' fontSize='sm'>
                19
              </SliderMark>
              <SliderMark value={23} mt='1' ml='-2.5' fontSize='sm'>
                23
              </SliderMark>
              <SliderMark value={28} mt='1' ml='-2.5' fontSize='sm'>
                28
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg='teal.500'
                color='white'
                placement='top'
                label={`${gstRate}%`}
              >
                <SliderThumb />
              </Tooltip>
            </Slider>
            <Stack pt={"40px"} gap={{ base: "2", sm: "5" }} direction={{ base: "column", sm: "row" }}>
              <Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>GST Amount: </Text>
              {/* <Text color={'black'} fontWeight={"bold"} fontSize={"xl"}>{gstAmount.toFixed(2)}</Text> */}
              <Text color={'blue.600'} fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>{gstAmount.toFixed(2)}</Text>
              <Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>Total Amount: </Text>
              <Text color={'blue.600'} fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}> {totalAmount.toFixed(2)}</Text>
            </Stack>

            <Stack py={{ base: "2", sm: "5" }} gap={{ base: "2", sm: "5" }} direction={{ base: "column", sm: "row" }}>
              <Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>CGST Amount: </Text>
              <Text color={'blue.600'} fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>{sgstAmount.toFixed(2)}</Text>
              <Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>SGST Amount: </Text>
              <Text color={'blue.600'} fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>{sgstAmount.toFixed(2)}</Text>
              <Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>IGST Amount: </Text>
              <Text color={'blue.600'} fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }}>{igstAmount.toFixed(2)}</Text>
            </Stack>
            <RadioGroup
              onChange={handleGST}
              value={Addgst}
              defaultValue='true'
            >
              <Stack direction='row' justifyContent={'center'}>
                <Radio value='true'><Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }} pb={"10px"}>Add GST</Text></Radio>
                <Radio value='false'><Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "lg", lg: "xl" }} pb={"10px"}>Remove GST</Text></Radio>
              </Stack>
            </RadioGroup>

            <Button
              colorScheme='blue'
              px='8'
              pl='10'
              pr='10'
              w={"150px"}
              type='submit'
              onClick={() => calculate()}
            >Calculate
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </div>
  )
}

export default index