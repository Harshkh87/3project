import React, { useEffect, useState } from 'react'
import Navbar from "../navbar"
import {
  Heading, Input, VStack, Box, Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark, Tooltip, Text, HStack, Select, Stack, Flex, useColorMode
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
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productName, setProductName] = useState('');

  // Mapping between categories and corresponding GST rates
  const categoryGstRateMap = {
    food: 18,
    vehicle: 28,
    furniture: 12,
    electronic: 28,
    loan: 18,
  };

  const productGstRateMap = {
    Pizza: 5,
    Drinks: 12,
    Rice: 18,
    Fruits: 0,
    Vegetables: 0,
    Car: 28,
    Bike: 25,
    Van: 18,
    Chair: 10,
    Table: 12,
    Sofa: 15,
    Computer: 28,
    Mouse: 18,
    CPU: 15,
    Mobile: 28,
    Home: 18,
    Business: 12,
  };

  const categoryProductMap = {
    food: ["Pizza", "Drinks", "Rice", "Fruits", "Vegetables"],
    vehicle: ["Car", "Bike", "Van"],
    furniture: ["Chair", "Table", "Sofa"],
    electronic: ["Computer", "Mouse", "CPU", "Mobile"],
    loan: ["Home", "Car", "Business"],
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setSelectedProduct(categoryProductMap[newCategory][0]);
    // console.log(categoryProductMap[newCategory][0])
    setGstRate(productGstRateMap[categoryProductMap[newCategory][0]] || 0);      // slider move
  };

  const handleProductNameChange = (e) => {
    const newProductName = e.target.value;
    setProductName(newProductName);
    // console.log(newProductName)

    setGstRate(productGstRateMap[newProductName] || 0);                      // slider move
  };

  const handleAmountChange = (e) => {
    const newAmount = parseFloat(e.target.value);
    // console.log(newAmount)
    setAmount(newAmount || '');
  };

  const handleSliderChange = (value) => {
    // console.log(value)
    setGstRate(value);                                                         // slider move
  };

  useEffect(() => {
    calculateGst();
  }, [handleAmountChange, handleCategoryChange])

  //calculate 
  const calculateGst = () => {
    const calculatedGst = (amount * gstRate) / 100;
    const calculatedTotal = amount + calculatedGst;
    // console.log(calculatedTotal)
    setGstAmount(calculatedGst);
    setTotalAmount(calculatedTotal);
  };
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
          <Box
            // border={'1px solid black'}
            minW={{ base: "50%", md: "600px" }}
          >
            <HStack gap={"100px"} pb={"30px"}>
              <HStack gap={"20px"}>
                <Text fontWeight={"bold"} fontSize={"xl"}>Product</Text>
                <Select
                  value={productName}
                  onChange={handleProductNameChange}
                  borderColor={'blue'}
                >
                  {categoryProductMap[selectedCategory].map((product1) => (
                    <option
                      key={product1}
                      value={product1}
                    >
                      {product1}
                    </option>
                  ))}
                </Select>
              </HStack>
              <HStack gap={"20px"}>
                <Text fontWeight={"bold"} fontSize={"xl"}
                >Category</Text>
                <Select value={selectedCategory}
                  onChange={handleCategoryChange}
                  borderColor={'blue'}
                  placeholder='Select option'>
                  {Object.keys(categoryGstRateMap).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </HStack>
            </HStack>

            <Text fontWeight={"bold"} fontSize={"xl"} pb={"10px"}>Cost of Goods / Services</Text>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
              h="64px"
              bg="#fff"
              border=" 1px solid #0b70e7"
              boxShadow="0 0 12px rgb(0 0 0 / 6%)"
              w="80%"
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
            <HStack pt={"40px"} gap={5}>
              <Text fontWeight={"bold"} fontSize={"xl"}>GST Amount: </Text>
              {/* <Text color={'black'} fontWeight={"bold"} fontSize={"xl"}>{gstAmount.toFixed(2)}</Text> */}
              <Text color={'blue.600'} fontWeight={"bold"} fontSize={"xl"}>{gstAmount}</Text>
              <Text fontWeight={"bold"} fontSize={"xl"}>Total Amount: </Text>
              <Text color={'blue.600'} fontWeight={"bold"} fontSize={"xl"}> {totalAmount}</Text>
            </HStack>

            <HStack pt={"40px"} gap={5}>
              <Text fontWeight={"bold"} fontSize={"xl"}>CGST Amount: </Text>
              <Text color={'blue.600'} fontWeight={"bold"} fontSize={"xl"}>{gstAmount.toFixed(2) / 2}</Text>
              <Text fontWeight={"bold"} fontSize={"xl"}>SGST Amount: </Text>
              <Text color={'blue.600'} fontWeight={"bold"} fontSize={"xl"}>{gstAmount.toFixed(2) / 2}</Text>
            </HStack>
          </Box>
          {/* </VStack> */}
        </Stack>
      </Flex>
    </div>
  )
}

export default index