import { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { getUsers, editUser } from '../Service/api';
import './Style.css';



const initialValue = {
    name: '',
    username: '',
    email: '',
    phone: ''
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const EditUser = () => {
    const [user, setUser] = useState(initialValue);
    const { firstname, lastname, address, birthdate } = user;
    const { id } = useParams();
    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async() => {
        const response = await getUsers(id);
        setUser(response.data);
    }

    const editUserDetails = async() => {
        const response = await editUser(id, user);
        history.push('/all');
    }

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
  const handleChange = ()=>{
   history.push('/all');
  }
    return (
        <>
        <button className='btn' onClick={handleChange}>Back</button>
         <FormGroup className={classes.container}>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input"></InputLabel>
                <Input onChange={(e) => onValueChange(e)} placeholder='Firstname' name='firstname' value={firstname} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input"></InputLabel>
                <Input onChange={(e) => onValueChange(e)} placeholder='Lastname' name='lastname' value={lastname} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input"></InputLabel>
                <Input onChange={(e) => onValueChange(e)}  placeholder='address' name='address' value={address} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input"></InputLabel>
                <Input onChange={(e) => onValueChange(e)} type='date' name='birthdate' value={birthdate} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>Edit User</Button>
            </FormControl>
        </FormGroup>
        </>
     
    )
}

export default EditUser;