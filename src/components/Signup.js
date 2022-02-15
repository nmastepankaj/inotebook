import React, {useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})

    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        let host = "http://localhost:3005";
        e.preventDefault();
        const responce = await fetch(`${host}/api/auth/createuser`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email,password: credentials.password}),
        })

        const json = await responce.json();
        console.log(json)
        if(json.success){
            // redirect
            localStorage.setItem('token',json.authToken);
            navigate("/")
            props.showAlert("Account Created successfully","success")
        }else{
            props.showAlert("Invalid Credentials","danger")
        }
    }
    return (
            <div className="row justify-content-center">
            <div className="col-md-6">
            <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" value={credentials.name} onChange={onChange} className="form-control" id="name" name="name" aria-describedby="name" required minLength={5}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" required minLength={5}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name="password" required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="cpassword" value={credentials.cpassword} onChange={onChange} className="form-control" id="cpassword" name="cpassword" required minLength={5}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
        </div>
    )
}

export default Signup
