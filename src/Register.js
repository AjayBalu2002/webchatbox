import React, { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Alert, Button, Input} from '@mantine/core'
import './Register.css';
import axios from 'axios';
export default function Register()
{
const nav = useNavigate()
const [allco,setallcon] = useState([])
const [checler,setchecler] = useState(true)

const [Registervar,setRegistervar] = useState({
name:'',
password:'',
email:''

})

function handlename(name)
{
 const tempname =     name.target.value;
 const dummyreg = Registervar
 dummyreg.name = tempname
 setRegistervar(dummyreg)
}

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

function handlRegister()
{
    const checlerr = allco.some( ele => ele.email === (Registervar.email))
  setchecler(checlerr)
if(checlerr)
{
   alert("email is already taken")

}
else{
    axios.post('http://localhost:8080/save',Registervar).then( (response) => console.log(response))
    nav('/login')
}


}

useEffect(()=>{

    axios.get('http://localhost:8080/getall').then( res => setallcon(res.data))
    
    })


    



return(



<div>
<div>

<div className='TotalRegister'>


    <div className='RegisterCard'>
    <label className='RegisterLabels'>name</label>
    <Input  onChange={(e)=>handlename(e) } className='RegisterInput'  style={{width:'200px'}} ></Input>

<label className='RegisterLabelss'>email</label>
    <Input  onChange={(e)=>handleemail(e)} className='RegisterInput'  style={{width:'200px'}} ></Input>

<label className='RegisterLabelsss' >password</label>
    <Input   onChange={(e)=>handlepassword(e)} className='RegisterInput'  style={{width:'200px'}} ></Input>

    <Button onClick={()=>handlRegister()}  style={{backgroundColor:'orange'}}  >register</Button>
 
    </div>

  
</div>
</div>
</div>

    )
}