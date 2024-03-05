import { Button } from 'flowbite-react'
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { signInFailure,signInSuccess,signInStart } from "../redux/user/userSlice";
import { AiFillGoogleCircle } from "react-icons/ai";
import {GoogleAuthProvider,getAuth,signInWithPopup} from "firebase/auth"
import { app } from '../firbase';
function Outh() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

    async function handelGoogleclic(){
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})

        try {
            const resultFromGoogle = await signInWithPopup(auth,provider)
            const res = await fetch('/api/auth/google',{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    name:resultFromGoogle.user.displayName,
                    email:resultFromGoogle.user.email,
                    googlePhotoUrl:resultFromGoogle.user.photoURL
                })
            })
            const data = await res.json()
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button gradientDuoTone={'pinkToOrange'} outline onClick={handelGoogleclic} >
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        Continue with google</Button>
  )
}

export default Outh