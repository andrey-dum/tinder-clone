import { useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export const AuthModal = ({
    showModal,
    setShowModal,
    authToken,
    isSignUp
}) => {

    // const authToken = false
    const [userData, setUserData] = useState(null)
    const [error, setError] = useState(null)

    let navigate = useNavigate()

    const handleCloseModal = () => {
        setShowModal(false)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if(isSignUp && userData && (userData?.password !== userData?.confirmPassword)) {
                setError('Password need to match!')
                return
            }

            // login
            const response = await axios.post('http://localhost:8000/signup', {
                email: userData?.email,
                password: userData?.password
            })

            const success = response.status === 201;

            if (success) navigate('/onboarding')


        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setUserData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    console.log(userData)

    return (
      <div className="modal">
          <div className="modal-block">
            <div className="modalClose" onClick={handleCloseModal}>
                <div className="modalCloseIcon">
                    x
                </div>
            </div>
            <div className="modalBody">
                <h2>{isSignUp ? 'Create account' : 'Sign In'}</h2>
                <p>By clicking Log in, you agree to our Terms. Learn how we process your data in our Privacy Policy and Cookie Policy</p>
                <form
                    onSubmit={handleSubmit}
                    className="authForm"
                >
                    <input 
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={userData?.email}
                        required={true}
                        onChange={handleChange}
                    />
                    <input 
                        type="password"
                        name="password"
                        id="password"
                        value={userData?.password}
                        placeholder="Password"
                        required={true}
                        onChange={handleChange}
                    />
                    {
                        isSignUp &&
                    
                        <input 
                            type="password"
                            name="confirmPassword"
                            value={userData?.confirmPassword}
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            required={true}
                            onChange={handleChange}
                        />
                    }


                <button 
                    className="primary-button"
                    type="submit"
                    // disabled={showModal}
                >
                    {isSignUp ? 'Create account' : 'Sign In'}
                </button>
                <p>{error}</p>
                    

                </form>
            </div>
          </div>
      </div>
    )
  }
  
  

  