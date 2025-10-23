import { GoogleLogin } from '@react-oauth/google'
import axiosInnstance from '../../utils/axios'
import { useNavigate } from 'react-router-dom'


const GoogleAuthButton = () => {

  const navigate = useNavigate()

  const handleSuccessGoogleLogin = async (credential) => {
    try {
      console.log(credential)
      const res = await axiosInnstance.post('/user/google-auth', {
        credential
      })
      console.log(res.data)
      if (res.status === 201) {
        //settokenere
        navigate('/')
      }
    } catch (error) {
      console.log('error from express with google login', error)
    }
  }
  return (
    <div className='w-full flex items-center justify-center'>
      <GoogleLogin
        onSuccess={(credentialResponse) => handleSuccessGoogleLogin(credentialResponse.credential)}
        onError={() => console.log('Login failed')}
        auto_select={true}
      />
    </div>
  )
}

export default GoogleAuthButton