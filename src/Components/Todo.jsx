import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import './Todo.css'
import axios from 'axios';


const Todo = () => {


    const [todo,settodo]=useState([]);

    const fetchtodo = async ()=>{
       const res= await axios.get("http://localhost:5000/todo");
       settodo(res.data);

    }

    useEffect(()=>{
        fetchtodo();
    },[])

   const [title,sett]= useState();
   const [description,setd]= useState();

   const handlsub = async(e)=>{
    e.preventDefault();
    if(!title || !description){
        toast.error("Please fill all the fields");
        return
    }
    const data= { 
        title,
        description
    };

    const res = await axios.post("http://localhost:5000/todo",data);
    console.log(res);
    toast.success("Todo added successfully");
    fetchtodo();
    sett('');
    setd('');
    
   }
    

   const handleDelete = async(id)=>{
      const res = await axios.delete(`http://localhost:5000/todo/${id}`);
      fetchtodo();
      toast.success("Todo deleted successfully");

   }

   const handleup = async(t)=>{
    const data = { completed: !t.completed }
    console.log(data);
    
     const res = await axios.put(`http://localhost:5000/todo/${t._id}`,data);
     if(t.completed==false){
        toast.success("Completed the Work Successfully");
     }
     else{
        toast.info("Complete The work");
     }
     fetchtodo();


   }


  
  return (
    <>
       <section>
        
          <div className="todo">
            <div className="part1">
                <form onSubmit={handlsub} >
                    <h1>Create <span id='oo'>TODO</span></h1>
                    <input type="text" placeholder='Title' onChange={(e)=>sett(e.target.value)}  value={title}/>
                    <textarea name="" id="" placeholder='Description' onChange={(e)=>setd(e.target.value)} value={description}></textarea>
                    <button id='bb'>Add</button>
                </form>
            </div>
            <div className="part2">
                <h1><span id='tt'>T</span>ASKS</h1>
                {

                    todo.map((n,i)=>(
                         <div className="todo-con" key={i}>
                    <div className={`item ${n.completed ? 'fin' : ''}`}>
                        {
                            n.completed?(
                                <>
                                 <h2><strike>{n.title}</strike></h2>
                             <p><strike>{n.description}</strike></p>
                                </>
                            ):
                            (
                                  <>
                                  
                                    <h2>{n.title}</h2>
                                    <p>{n.description}</p>
                                  </>
                            )}
                        
                        <div className="action">
                            <button className='b1' onClick={()=>handleup(n)}><i className={`fa-solid ${n.completed ? 'fa-xmark' : 'fa-check' }`}></i></button>
                            <button className='b2' onClick={()=>handleDelete(n._id)}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                
                </div>
                    ))
                } 
            </div>
             
          </div>
       
       </section>
    </>
  )
}

export default Todo
