import React, { useState } from 'react'
import Navbar from "../navbar"
import { Box, Heading, VStack, Text, useColorMode, Button } from '@chakra-ui/react'
// import { Result } from 'postcss';
// import './style.css'

function index() {
    // const { colorMode } = useColorMode();
    // const [display,setDisplay] = useState('');
    const [input, setInput] = useState('');
    const [result, setResult] = useState(0);

    const handleButtonClick = (value) => {
        setInput((prevInput) => prevInput + value);
    };

    const handleCalculate = () => {
        try {
            setResult(eval(input));
            setInput(eval(input))
        } catch (error) {
            setResult('Error');
        }
    };

    const handleClear = () => {
        setInput('');
        setResult(0);
    };

    const handleCr = () => {
        const number = input.slice(0, -1);
        setInput(number);
        setResult(0);
    };

    const buttonStyling = {
        // variantColor: colorMode === "light" ? "pink" : "teal",
        variant: "solid",
        fontSize: ["xl", "xl"],
        margin: "2px",
        width: "70px",
        height: "50px",
        border: "1px solid white"

    };
    return (
        <div>
            <Navbar />
            <VStack minH='100vh' pb={28} minW={'350px'}>
                <Heading
                    p='5'
                    fontWeight='extrabold'
                    size='xl'
                    bgGradient='linear(to-l, teal.300, blue.500)'
                    bgClip='text'
                >
                    Calculator
                </Heading>
                <Box
                    padding={["15px", "10px"]}
                    borderRadius={["6px", "4px"]}
                    bg={"blue"}
                    display="inline-block"
                    margin=" 0 10px 10px 10px"
                    text-align="left"
                //  border={'1px solid red'}
                >
                    <Box
                        height="40px"
                        bg={"white"}
                        p=" 4px"
                        mb={"10px"}
                        mt={"2px"}
                        borderRadius={"4px"}
                        w={'full'}
                    >
                        <Text
                            fontSize={["xl", "lg"]}
                            color="gray.700"
                            textOverflow="ellipsis"
                            overflow="hidden"
                            type="text" 
                        >{input}</Text>
                    </Box>
                    <Box style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button
                            {...buttonStyling}
                            variantColor="purple"
                            name="CE"
                            // onClick={() => handleButtonClick('1')}
                            onClick={handleCr}
                        >CE</Button>
                        <Button
                            {...buttonStyling}
                            name="C"
                            // onClick={() => handleButtonClick('1')}
                            onClick={handleClear}
                        >C</Button>
                        <Button
                            {...buttonStyling}
                            name="%"
                            onClick={() => handleButtonClick('%')}
                        >%</Button>
                        <Button
                            {...buttonStyling}
                            name="="
                            // onClick={() => handleButtonClick('=')}
                            onClick={handleCalculate}

                        >=</Button>
                    </Box>
                    <Button
                        {...buttonStyling}
                        name="7"
                        // onClick={(e) => e.target.name}
                        onClick={() => handleButtonClick('7')}
                    >7</Button>
                    <Button
                        {...buttonStyling}
                        name="8"
                        onClick={() => handleButtonClick('8')}
                    >8</Button>
                    <Button
                        {...buttonStyling}
                        name="9"
                        onClick={() => handleButtonClick('9')}
                    >9</Button>
                    <Button
                        {...buttonStyling}
                        name="/"
                        onClick={() => handleButtonClick('/')}
                    >/</Button>
                    <br />
                    <Button
                        {...buttonStyling}
                        name="4"
                        onClick={() => handleButtonClick('4')}
                    >4</Button>
                    <Button
                        {...buttonStyling}
                        name="5"
                        onClick={() => handleButtonClick('5')}
                    >5</Button>
                    <Button
                        {...buttonStyling}
                        name="6"
                        onClick={() => handleButtonClick('6')}
                    >6</Button>
                    <Button
                        {...buttonStyling}
                        name="*"
                        onClick={() => handleButtonClick('*')}
                    >*</Button>
                    <br />
                    <Button
                        {...buttonStyling}
                        name="1"
                        onClick={() => handleButtonClick('1')}
                    >1</Button>
                    <Button
                        {...buttonStyling}
                        name="2"
                        onClick={() => handleButtonClick('2')}
                    >2</Button>
                    <Button
                        {...buttonStyling}
                        name="3"
                        onClick={() => handleButtonClick('3')}
                    >3</Button>
                    <Button
                        {...buttonStyling}
                        name="-"
                        onClick={() => handleButtonClick('-')}
                    >-</Button>
                    <br />
                    <Button
                        {...buttonStyling}
                        name="0"
                        onClick={() => handleButtonClick('0')}
                    >0</Button>
                    <Button
                        {...buttonStyling}
                        name="."
                        onClick={() => handleButtonClick('.')}
                    >.</Button>
                    <Button
                        {...buttonStyling}
                        name="00"
                        onClick={() => handleButtonClick('00')}
                    >00</Button>
                    <Button
                        {...buttonStyling}
                        name="+"
                        onClick={() => handleButtonClick('+')}
                    >+</Button>
                </Box>
            </VStack>
        </div>
    )
}

export default index