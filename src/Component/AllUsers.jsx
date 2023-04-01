import react, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles, Checkbox } from '@material-ui/core'
import { getUsers, deleteUser } from '../Service/api';
import { Link } from 'react-router-dom';
import {  UseRowSelectHooks } from 'react-table';

const useStyles = makeStyles({
    table: {
        width: '90%',
        margin: '50px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})


const AllUsers = () => {
    const [isLoad, setIsLoad] = useState(true);
    const [users, setUsers] = useState([]);
    const classes = useStyles();

    const columns =  [
          {
            Header: "ID",
            accessor: "id",
          },
          {
            Header: "First Name",
            accessor: "firstname",
          },
          {
            Header: "Last Name",
            accessor: "lastname",
          },
          {
            Header: "Address",
            accessor: "address",
          },
          {
            Header: "BirthDate",
            accessor: "birthdate",
          },
        ]


    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUserData = async (id) => {
        await deleteUser(id);
        getAllUsers();
    }

    const getAllUsers = async () => {
        setIsLoad(true);
        try{
            let response = await getUsers();
          if(response.status ===200){
            setIsLoad(false);
            setUsers(response.data);        
          }
      
        }catch(err){
          console.log(err);
        }

    }

    return (
        <>
        {isLoad &&<h1 style={{textAlign:'center'}}>Fetching Data......</h1>}
         <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    {columns.map((column)=>{
                       return <TableCell>{column.Header}</TableCell>
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow className={classes.row} key={user.id}>
                         {columns.map((column)=>{
                       return <TableCell>{user[column.accessor]}</TableCell>
                    })}
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${user.id}`}>Edit</Button>
                            <Button color="secondary" variant="contained" onClick={() => deleteUserData(user.id)}>Delete</Button> 
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
       
    )
}

export default AllUsers;



