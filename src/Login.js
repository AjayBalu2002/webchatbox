import React, { Component ,useState} from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import {Button, Input} from '@mantine/core'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login()
{
    const nav = useNavigate()




   
const [Registervar,setRegistervar] = useState({
    name:'',
    password:'',
    email:''
    
    })
        
       
        
        function handlepassword(pass)
        {
         const tempname =     pass.target.value;
         const dummyreg = Registervar
         dummyreg.password = tempname
         setRegistervar(dummyreg)
        }
        
        function handleemail(email)
        {
         const tempname =     email.target.value;
         const dummyreg = Registervar
         dummyreg.email = tempname
         setRegistervar(dummyreg)
        }
        

    function handellogin()
    {
     axios.post( 'http://localhost:8080/checkarr',Registervar  ).then( (res) => {
if(res.data)
{
  
  
  const onmail = {email:Registervar.email}
  axios.post('http://localhost:8080/checktheidone',onmail).then((response)=>{
    const idone  = response.data
    nav(`/allcontacts/${idone}`)
  })
    
    
 
}
else
{
    alert('your eamil and password is wrong')
}


     }
     
     )
        console.log(Registervar)
    }









    return(
        <div>
<div className='TotalLogin'>
    <div className='LoginCard'>
<label className='loginLabelss'  >email</label>
    <Input className='LoginInput'  onChange={(e)=>handleemail(e)}  style={{width:'200px'}} ></Input>
<label className='loginLabels' >password</label>
    <Input  className='LoginInput'  onChange={(e)=>handlepassword(e)} style={{width:'200px'}} ></Input>

    <Button style={{backgroundColor :'orange'}} onClick={()=>handellogin()} >Login</Button>
 <label> don't have an account?</label> <a onClick={()=>nav('/register')} style={{color:'black'}}  >register now</a> 
 
    </div>

  
</div>
</div>
    )
}