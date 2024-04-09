// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../navbar";
import {
  Box, Heading, Input, Button, HStack, Text, VStack, StackDivider, Stack, Flex, IconButton, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, Checkbox
} from '@chakra-ui/react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
 

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    axios.get('http://localhost:3000/api/tasks')
      .then(response => 
        { 
          setTasks(response.data)
          // console.log(response.data)
        })
      .catch(error => console.error('Error fetching tasks:', error));
    // const fetchTasks = async (data) => {
    //   try {
    //       const response = await axios.get('http://localhost:3000/api/tasks');
    //       setTasks(response.data)
    //       return response;
    //   } catch (error) {
    //       console.log('Error while calling the API ', error.message);
    //   }
    // };
    // fetchTasks();
  }, []);

  const addTask = () => {
    // Send a POST request to add a new task
    axios.post('http://localhost:3000/api', { text: newTask })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask('');
        console.log(response.data)
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div className="App">
      <Navbar />
      <VStack p={4} minH='100vh' pb={28}>
        <Heading
          p='5'
          fontWeight='extrabold'
          size='xl'
          bgGradient='linear(to-l, teal.300, blue.500)'
          bgClip='text'
        >
          Todo List
        </Heading>
        {/* <form onSubmit={handleSubmit}> */}
        <Input
          variant='flushed'
          placeholder='Title'
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
          value={newTask} onChange={e => setNewTask(e.target.value)}
        />
        <Button
          colorScheme='blue'
          px='8'
          pl='10'
          pr='10'
          // type='submit'
          onClick={addTask}
        >Add Task</Button>
        {/* </form> */}
        <TableContainer
          w={'150vh'}
        //  overflow={'auto'}
        >
          <Table variant='simple'>
          
            {tasks.map((task) => (
              <Text
                w='100%'
                p='8px'
                borderRadius='lg'
                cursor='pointer'
              >
                <li key={task._id}>{task.text}</li>
                {/* {todo.title} */}
              </Text>
            ))}
          </Table>
        </TableContainer>
      </VStack>

    </div>
  );
}

export default App;
