import React, { useState, useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, editTodo } from '../../../redux/redux-action/action';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Index() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [phone, setPhone] = useState('');
  const [checked, setchecked] = useState(false);


  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  // console.log("Todos", todos);
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    // const hour = today.getHours();
    // const min = today.getMinutes();
    // const sec = today.getSeconds();
    return `${month}/${date}/${year}`;
  }

  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptytitle = title.trim();
    const emptybody = body.trim();

    if (!emptytitle && !emptybody) {
      toast.error(" Please write something! ")
      return setText('') || setBody('');
    }

    if (phone.length < 10) {
      toast.error(" Please write 10 digit number! ")
      return setPhone('');
    }
    // console.log(editing)
    // if == editing and else == Add;

    if (editing) {
      // Editing existing todo
      const newDate = getDate();                                   
      setTodos((prevTodos) =>
        prevTodos.map((todo, i) => (i === editIndex ? { title: title, body: body, phone: phone, currentDate: newDate } : todo))
      );
      dispatch(editTodo(editIndex, { title, body, currentDate: Date, phone }));
      // console.log(title)
      setEditing(false);
      setEditIndex(null);
      setTitle('');
      setBody('');
      setPhone('');
    } else {
      // Adding new todo
      const Date = getDate();                                            // call current time
      dispatch(addTodo({ title, body, currentDate: Date, phone, checked }));
      setTodos((prevTodos) => [...prevTodos, { title, body, currentDate: Date, phone, checked }]);
      setTitle('');
      setBody('');
      setPhone('');
    }
  };

  const EditTodo = (index, currentTitle, currentBody, currentPhone) => {
    setEditIndex(index);
    setEditing(true);
    // console.log("index",currentTitle);
    setTitle(currentTitle);
    setBody(currentBody);
    setPhone(currentPhone);
  };

  const handleRemoveTodo = (index) => {
    dispatch(removeTodo(index));
    setTodos((prevTodos) => prevTodos.filter((todo, i) => i !== index));
  };

  // delete by check box 
  const handleCheck = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = !updatedTodos[index].checked;            // change checked value
    // console.log(updatedTodos);
    setTodos(updatedTodos);
  };

  // delete by delete button
  const handleDelete = () => {
    const updatedTodos = todos.filter((todo) => !todo.checked);
    // console.log(updatedTodos);
    setTodos(updatedTodos);
  }

  const handleDeleteAll = () => {
    setTodos([])
  }

  return (
    <div>
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
        <form onSubmit={handleSubmit}>
          <Input
            variant='flushed'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            mt='4'
            variant='unstyled'
            placeholder='Body'
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Input
            mt='4'
            variant='unstyled'
            placeholder='Phone'
            type="text"
            value={phone}
            maxlength="10"
            // pattern="\d{10}"
            pattern="[6-9]{1}[0-9]{9}"
            title="Please enter exactly 10 digits"
            onChange={(e) => setPhone(e.target.value)}
          />
          <HStack mt='4' mb='4'>
            <Button
              colorScheme='blue'
              px='8'
              pl='10'
              pr='10'
              type='submit'
            >{editing ? 'EDIT' : 'ADD'}</Button>
            <Button
              colorScheme='blue'
              px='8'
              pl='10'
              pr='10'
              // type='submit'
              onClick={() => handleDeleteAll()}
            >Delete All
            </Button>
            <ToastContainer position="top-center" />
          </HStack>
        </form>
        <TableContainer
          w={'150vh'}
        //  overflow={'auto'}
        >
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Index</Th>
                <Th>time</Th>
                <Th>Phone</Th>
                <Th>Data</Th>
                <Th></Th>
              </Tr>
            </Thead>

            {todos.map((todo, index) => (
              <Tbody>
                <Tr key={index}>
                  <Td>
                    <input
                      type="checkbox"
                      onChange={() => handleCheck(index)}
                      value={todo.checked}
                      autocomplete="off"
                    />
                  </Td>
                  <Td>{index + 1}</Td>
                  <Td>{todo.currentDate}</Td>
                  <Td>{todo.phone}</Td>
                  <Td>
                    <Text
                      w='100%'
                      p='8px'
                      borderRadius='lg'
                      cursor='pointer'
                    >
                      {todo.title}
                      <br />
                      {todo.body}
                    </Text>
                  </Td>
                  <Td>
                    <HStack>
                      <IconButton
                        icon={<FiTrash2 />}
                        isRound='true'
                        onClick={() => handleRemoveTodo(index)}
                      />
                      <IconButton
                        icon={<FiEdit />}
                        isRound='true'
                        onClick={() => EditTodo(index, todo.title, todo.body, todo.phone)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </TableContainer>
        <Button
          colorScheme='blue'
          px='8'
          pl='10'
          pr='10'
          // type='submit'
          onClick={() => handleDelete()}
        >Delete
        </Button>
      </VStack>
    </div>
  );
}

export default Index;
