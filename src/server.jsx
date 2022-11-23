import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styles from './Table.module.css';
import loadImg from "./giphy.gif";
function Server()
{
    const[posts, setPosts] = useState([]);
    const[loading, setLoading] = useState(false);

    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[age, setAge] = useState(0);
    const[role, setRole] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        if(firstName==="")
        {
            alert("please fill all the data");
        }
        else if(lastName==="")
        {
            alert("please fill all the data");
        }
        else if(role==="")
        {
            alert("please fill all the data");
        }
        else if(age===0)
        {
            alert("please fill all the data");
        }
        else
        {
            const post = {firstName, lastName, age, role}
            console.log(post);
            
            axios.post('http://localhost:8080/save', post)
            .then((response) => alert(response.data))
            .catch((error)=>console.log(error));
        }
    }

    const updateHandler = (id) => {
        if(firstName==="")
        {
            alert("please fill all the data");
        }
        else if(lastName==="")
        {
            alert("please fill all the data");
        }
        else if(role==="")
        {
            alert("please fill all the data");
        }
        else if(age===0)
        {
            alert("please fill all the data");
        }
        else
        {
            const post = {firstName, lastName, age, role}
            console.log(post); 

            axios.put(`http://localhost:8080/update/${id}`, post)
            .then((response) => alert(response.data))
            .catch((error) => console.log(error))
        }
    }

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8080/delete/${id}`)
        .then((response)=>alert(response.data))
        .catch((error) => console.log(error))
    }

    useEffect(()=>{
        setTimeout(() => {
            axios.get("http://localhost:8080/users")
            .then((response) => {
            // console.log(response.data);
            setLoading(true);
            setPosts(response.data)
            })
            .catch((error) => console.log(error))
        }, 1000)
    }, [posts])

    return (
        <>
        <form className={styles.form}>
            <div>
            <label>First name : </label>
            <input type="text" value={firstName} onChange={(event)=>setFirstName(event.target.value)} required/>
            </div>
            <div>
            <label>Last name : </label>
            <input type="text" value={lastName} onChange={(event)=>setLastName(event.target.value)} required/>
            </div>
            <div>
            <label>Age : </label>
            <input type="text" value={age} onChange={(event)=>setAge(event.target.value)} required/>
            </div>
            <div>
            <label>Role : </label>
            <input type="text" value={role} onChange={(event)=>setRole(event.target.value)} required/>
            </div>
            <button onClick={submitHandler}>submit</button>
        </form>
        {
        loading ? 
        <table className={styles.table}>
            <h1>Total Users : {posts.length}</h1>
            <thead className={styles.thead}>
                <tr>
                    <th className={styles.th}>Id</th>
                    <th className={styles.th}>First name</th>
                    <th className={styles.th}>Last name</th>
                    <th className={styles.th}>Age</th>
                    <th className={styles.th}>Role</th>
                    <th className={styles.th}>Update</th>
                    <th className={styles.th}>Delete</th>
                </tr>
            </thead>

            <tbody>
                {
                    posts.map((post) => (
                        <tr key={post.id}>
                            <td className={styles.td}>{post.id}</td>
                            <td className={styles.td}>{post.firstName}</td>
                            <td className={styles.td}>{post.lastName}</td>
                            <td className={styles.td}>{post.age}</td>
                            <td className={styles.td}>{post.role}</td>
                            <td className={styles.td}><button onClick={() => updateHandler(post.id)} className={styles.updateBut}>Update</button></td>
                            <td className={styles.td}><button onClick={() => deleteHandler(post.id)} className={styles.deleteBut}>Delete</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table> :
        
        <img src={loadImg} alt="loading..."/>
        }
        
        </>
    )
}

export default Server;