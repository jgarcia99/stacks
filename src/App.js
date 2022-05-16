import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';


import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editing, setEdit] = useState(false);
  const [newFirstName, setFirstName] = useState("");
  const [newLastName, setLastName] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newPhoneNumber, setPhoneNumber] = useState("");
  const [newAge, setAge] = useState(0);
  const myCollectionOfUsers = collection(db, "users");

  const getUsers = async () => {
    const data = await getDocs(myCollectionOfUsers);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const createContact = async () => {
    await addDoc(myCollectionOfUsers, {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      phoneNumber: newPhoneNumber,
      age: Number(newAge) 
    })
    
    getUsers();
  }

  const updateContact = async () => {
    setEdit(true);
  }

  const saveContact = async (id, user) => {
    const contactDoc = doc(db, "users", id);
    const newFields = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      phoneNumber: newPhoneNumber,
      age: Number(newAge) 
    }

    await updateDoc(contactDoc, newFields);
    setEdit(false);
    getUsers();
  }

  const deleteContact = async (id) => {
    const contactDoc = doc(db, "users", id);
    await deleteDoc(contactDoc);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      {!editing &&
      <div>
        <h2>Create Contact</h2>
        <TextField
        id="firstName"
        onChange={(event) => {
          setFirstName(event.target.value)
        }}
        label="First Name"
        placeholder="First Name"
      />
      <TextField
        id="lastName"
        label="Last Name"
        placeholder="Last Name"
        onChange={(event) => {
          setLastName(event.target.value)
        }}
      />
      <TextField
        id="email"
        label="Email"
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value)
        }}
      />
      <TextField
        id="phoneNumber"
        label="Phone Number"
        placeholder="Phone Number"
        onChange={(event) => {
          setPhoneNumber(event.target.value)
        }}
      />
      <TextField
        id="age"
        label="Age"
        placeholder="Age"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        onChange={(event) => {
          setAge(event.target.value)
        }}
      />

      <Stack spacing={2} direction="row">
        <Button onClick={createContact} variant="contained">Create Contact</Button>
      </Stack>
      </div>
}
      <h2>Users</h2>
      {users.map((user, index) => {
        return (
          <div key={user.id} className={(!editing ? 'wrapper' : `container container-${index}`)}>
          {!editing
           ? (<Card sx={{ maxWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  First Name: {user.firstName}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Last Name: {user.lastName}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Email: {user.email}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Phone Number: {user.phoneNumber}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Age: {user.age}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => {deleteContact(user.id)}}>Delete</Button>
                <Button size="small" onClick={() => {updateContact(user.id, user)}}>Update</Button>
              </CardActions>
            </Card>)
           : (<div key={user.id} className="editing-texts">
             <h2>Update Contact</h2>
             <TextField
              id="firstName"
              onChange={(event) => {
                setFirstName(event.target.value)
              }}
              label="First Name"
              placeholder="First Name"
            />
            <TextField
              id="lastName"
              label="Last Name"
              placeholder="Last Name"
              onChange={(event) => {
                setLastName(event.target.value)
              }}
            />
            <TextField
              id="email"
              label="Email"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value)
              }}
            />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              placeholder="Phone Number"
              onChange={(event) => {
                setPhoneNumber(event.target.value)
              }}
            />
            <TextField
              id="age"
              label="Age"
              placeholder="Age"
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              onChange={(event) => {
                setAge(event.target.value)
              }}
            />
            <Button onClick={() => {saveContact(user.id, user)}}>Save Contact</Button>
           </div>)
           
          }
          </div>
        )
      })}
    </div>
  );
}

export default App;
