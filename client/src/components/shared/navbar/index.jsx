import { Box, Button,Stack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from "react-router-dom";

function index() {
  const navigate = useNavigate(); 
  return (
    <div>
      <Stack direction={{base: "column" , lg:"row"}}  
      // border={'2px solid red'}
      >
      <Box pt={'20px'}
        pl={'20px'}
      >
        <Button
          colorScheme='blue'
          px='4'
          pl='5'
          pr='5'
          mx={'2pc'}
          mb={{base:"2pc" , sm:"0pc"}}
          // type='submit'
          onClick={() => navigate("/calculate")}
        >Calculator
        </Button>

        <Button
          colorScheme='blue'
          px='4'
          pl='5'
          pr='5'
          mx={'2pc'}
          // type='submit'
          mb={{base:"2pc" , sm:"0pc"}}
          onClick={() => navigate("/")}
        >todo
        </Button>
        <Button
          colorScheme='blue'
          px='4'
          pl='5'
          pr='5'
          mx={'2pc'}
          // type='submit'
          mb={{base:"2pc" , sm:"0pc"}}
          onClick={() => navigate("/gstcalculator")}
        >Gst Calculator
        </Button>
        {/* <Button
          colorScheme='blue'
          px='4'
          pl='5'
          pr='5'
          mx={'2pc'}
          // type='submit'
          mb={{base:"2pc" , sm:"0pc"}}
          onClick={() => navigate("/todoserver")}
        >todo server
        </Button> */}
      </Box>
      </Stack>
    </div>
  )
}

export default index