import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { addUser } from '../Service/api';
import { useHistory } from 'react-router-dom';


const initialValue = {
    firstname: '',
    lastname: '',
    address: '',
    phone: '',
    birtdate:''
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

const AddUser = () => {
    const [user, setUser] = useState(initialValue);
    const { firstname, lastname, address, birthdate } = user;
    const classes = useStyles();
    let history = useHistory();

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    const addUserDetails = async() => {
        await addUser(user);
        history.push('./all');
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">FirstName</InputLabel>
                <Input  onChange={(e) => onValueChange(e)} name='firstname' value={firstname} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Lastname</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='lastname' value={lastname} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Address</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='address' value={address} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input"></InputLabel>
                <Input onChange={(e) => onValueChange(e)} type='date' name='birthdate' value={birthdate} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add User</Button>
            </FormControl>
        </FormGroup>
    )
}

export default AddUser;