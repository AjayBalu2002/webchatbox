import React, { Component, useEffect, useState } from 'react';
import './Allcontacts.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Allcontacts()
{
const {idone} = useParams()
const [allcontacts,setAllcontacts ]  = useState([])
const [recentId,setrecentid] = useState(0)
const [currentmeassage,setCurrentmessage] = useState('')
const [conversatiion,setConversation] = useState([])
const [openingpage,setOpeeningpage] = useState(true)
const [topname,settopname] = useState('')
 const nav =    useNavigate()

function handleallcontact(id,element){
const tempcont = {
idOne: parseInt(idone),
idTwo:id,
messages:[]
}
setOpeeningpage(false)
settopname(element)
axios.post( "http://localhost:8080/setthestarter",tempcont )
axios.post( "http://localhost:8080/retrieveeachconvo",tempcont ).then( res =>{
    if(res.data !== '')
    {
    setConversation(res.data.messages)
    }
})

setrecentid(id)

}


useEffect(()=>{
axios.get('http://localhost:8080/getall').then(res =>{ 
    const fakenum= parseInt(idone)
    const dummarr = res.data.filter( ele =>     fakenum!== ele.id)
 
    setAllcontacts(dummarr)

})


},[])






function handlemainbtn()
{
   
        const tempcont = {
        idOne:parseInt( idone),
        idTwo:recentId,
        messages:[
            {
                "keey": idone,
                "mess": currentmeassage
              }
        ]
        
        
        }
        setConversation([])
    axios.post("http://localhost:8080/addthemessage",tempcont).then(response =>  setConversation(response.data.messages))

setCurrentmessage('')
}


useEffect(()=>{
    const tempcont = {
        idOne: parseInt(idone),
        idTwo:recentId,
        messages:[]
        }



    axios.post( "http://localhost:8080/retrieveeachconvo",tempcont ).then( res =>{

        if(res.data !== '')
        {
        setConversation(res.data.messages)
        }
    })
},[conversatiion])

    return(


        <div className="container">
        <div className=" box1">
            
       
    
            <i onClick={()=>nav('/login')}  style={{color:'white',height:'20px',position:'absolute',bottom:'10px',left:'3px'}} class="bi bi-box-arrow-left"></i> 
        
      
        </div>
        <div className=" box2">
<div style={{background:'rgb(55, 71, 95)',display:'flex',flexWrap:'wrap',flexDirection:'column',color:'white',borderRadius:'20px'}} >contacts</div>
<div className='totalnames'>


{allcontacts.map( (ele,indx)  => <h4 key={indx} onClick={()=>handleallcontact(ele.id,ele.name)} className='eachname'>{ele.name} </h4> )}




<h4></h4>

</div>


        </div>

        {openingpage ?(
            <div style={{background:'  white ',fontFamily:'monospace'}} className=" box3">
              <div style={{position:'absolute',top:'500px',left:'800px'}}>  welcome to my chat-wep=app</div>

                <img height='200px'  style={{position:'absolute',top:'100px',left:'50%'}} src='https://cdn.shopify.com/s/files/1/2040/0303/products/Simple_Cute_Kawaii_Nursery_Animal_Cartoon_-_Penguin_696545712_1024x1024@2x.jpg?v=1499733886' ></img>
            </div>
        ):(
        <div className=" box3">
     <div className='receivername' >
        <img  height='35px' width='35px' style={{borderRadius:'20px',marginLeft:'100px'}}  src='https://th.bing.com/th/id/OIP.5aR5CBOEpQVVKM1ARCQCmQAAAA?pid=ImgDet&rs=1' ></img>
      <div style={{marginLeft:'10px'}}>  {topname} </div> </div>
     <div  className='totalcon' > 
{conversatiion.map( ele =>  (ele.keey===parseInt(idone)?<div className='sender'><h4 style={{maxWidth:'300px'}}>{ele.mess}</h4></div>:<div  className='receiver'><h4>{ele.mess}</h4></div>))}
</div>

<div className='totalbox3input'>
<input className='box3input'   value={currentmeassage}  onChange={(e)=>setCurrentmessage(e.target.value)}></input>
<button className='box3incon'  onClick={()=>handlemainbtn()} >➤</button>
</div>
        </div>
 )}
 </div>
    )
}