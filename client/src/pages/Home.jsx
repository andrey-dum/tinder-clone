import { useState } from "react"
import { AuthModal } from "../components/AuthModal"
import { Nav } from "../components/Nav"

export const Home = () => {

    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    
    const authToken = false
    
    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(true)
    }
    
    return (
        <>
        <Nav 
            minimal={false}
            showModal={showModal}
            setShowModal={setShowModal}
            setIsSignUp={setIsSignUp}
           
        />

        { 
        showModal && 
       <AuthModal
            showModal={showModal}
            setShowModal={setShowModal}
            authToken={authToken}
            isSignUp={isSignUp}
            
        />
    }

        <div className="home">
            <h1 className="title">Swipe Right™</h1>
            <button 
                className="primary-button"
                onClick={handleClick}
            >
                {authToken ? 'Signout' : 'Create account'}
            </button>
        </div>
        </>
    )
}


