import AuthContextProvider from '../contexts/userContext'
import '../styles/globals.css'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'

function Loading(){
  const router= useRouter()
  const [loading, setLoading]= useState(false)
    
  useEffect(() => {
    //for the user

    const handleStart= (url)=>(url !== router.asPath) && setLoading(true);
    const handleComplete= (url)=>(url === router.asPath) && setTimeout(()=>{setLoading(false)},10000) ;

    router.events.on('routerChangeStart', handleStart)
    router.events.on('routerChangeComplete', handleComplete)
    router.events.on('routerChangeError', handleComplete)

    return ()=>{
      router.events.off('routerChangeStart', handleStart)
      router.events.off('routerChangeComplete', handleComplete)
      router.events.off('routerChangeError', handleComplete)
    }
  })
  return loading &&(
    <div className='spinner-wrapper'>
      <div className='spinner'>
<h3>ddd</h3>
      </div>
    </div>
  )
}

function MyApp({ Component, pageProps }) {  
  const [user,setUser]= useState('')
  // const [user, setUser]= useState({access_token:"",refresh_token:"", role:""})
  useEffect(()=>{
    const getUser=window.localStorage.getItem('user')
    console.log(getUser)
    if (getUser!==null) setUser(JSON.parse(getUser))
  },[])   
  useEffect(()=>{
    console.log(user)
      window.localStorage.setItem('user',JSON.stringify(user))
  },[user])
  
  return (
    <>
    <Loading/>
    <Component {...pageProps} loggedUser={user} setUser={(user)=>setUser(user)}/>
    </>
    
  ) 
}

export default MyApp
