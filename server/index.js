// const express = require('express');
import express  from "express";
const app = express();
const port = 3001;
import cors from 'cors';

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

let tasks = [];

app.get('/api/tasks', (req, res) => {
  // console.log(tasks)
  // const newTask = req;
  // console.log(newTask)
  res.send(tasks)
  // res.json(tasks);
});

app.post('/api', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  // console.log(req.body)
  res.send(tasks);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
