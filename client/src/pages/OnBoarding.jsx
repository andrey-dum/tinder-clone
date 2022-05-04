import { useState } from "react"
import { Nav } from "../components/Nav"
import { useCookies } from 'react-cookie'
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const OnBoarding = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'woman',
    // email: '',
    url: '',
    about: '',
    matches: [],
  })

  

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

  }

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await axios.put(`http://localhost:8000/user`, { formData })

      const success = response.status === 200;

      if (success) navigate('/dashboard')

    } catch (error) {
        console.log(error)
    }

  }

  return (
    <div className="page account">
        <Nav 
            minimal={true}
            showModal={false}
            setShowModal={() => {}}
            setIsSignUp={() => {}}
           
        />
        
      <div className="pageBody">
        <h2>Create account</h2>

        <form className="profileForm" onSubmit={handleSubmit}>

          <section className="left">
            <div>
              <div><label htmlFor="first_name">First name</label></div>
              <input 
                id="first_name"
                name="first_name"
                type="text" 
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="dob_day">Birthday</label>
            <div className="dob multiply-input-container">
              <input 
                id="dob_day"
                name="dob_day"
                type="number" 
                placeholder="DD"
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input 
                id="dob_mouth"
                name="dob_month"
                type="number" 
                placeholder="MM"
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input 
                id="dob_year"
                name="dob_year"
                type="number" 
                placeholder="YYYY"
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="gender">Gender</label>
              <div className="multiply-input-container">
              <div className="multiply-input">
                <input 
                  id="man_gender"
                  name="gender_identity"
                  type="radio" 
                  value={'man'}
                  checked={formData.gender_identity === 'man'}
                  onChange={handleChange}
                />
                <label htmlFor="man_gender">Man</label>
              </div>
              <div className="multiply-input">
                <input 
                  id="woman_gender"
                  name="gender_identity"
                  type="radio" 
                  value={'woman'}
                  checked={formData.gender_identity === 'woman'}
                  onChange={handleChange}
                />
                <label htmlFor="woman_gender">woman</label>
              </div>
              <div className="multiply-input">
                <input 
                  id="more_gender"
                  name="gender_identity"
                  type="radio" 
                  value={'more'}
                  checked={formData.gender_identity === 'more'}
                  onChange={handleChange}
                />
                <label htmlFor="more_gender">more</label>
              </div>
            </div>
            </div>

            <div>
              <label htmlFor="more_gender">Show gender on my profile</label>
                <input 
                  id="show_gender"
                  name="show_gender"
                  type="checkbox"
                  checked={formData.show_gender}
                  onChange={handleChange}
                />
                
              </div>

              <div>
              <label htmlFor="">Show me</label>
              <div className="multiply-input-container">
              <div className="multiply-input">
                <input 
                  id="man_gender_interest"
                  name="gender_interest"
                  type="radio" 
                  value={'man'}
                  checked={formData.gender_interest === 'man'}
                  onChange={handleChange}
                />
                <label htmlFor="man_gender_interest">Man</label>
              </div>
              <div className="multiply-input">
                <input 
                  id="woman_gender_interest"
                  name="gender_interest"
                  type="radio" 
                  value={'woman'}
                  checked={formData.gender_interest === 'woman'}
                  onChange={handleChange}
                />
                <label htmlFor="woman_gender_interest">Woman</label>
              </div>
              <div className="multiply-input">
                <input 
                  id="everyone_gender_interest"
                  name="gender_interest"
                  type="radio" 
                  value={'everyone'}
                  checked={formData.gender_interest === 'everyone'}
                  onChange={handleChange}
                />
                <label htmlFor="everyone_gender_interest">Everyone</label>
              </div>
            </div>
            </div>

            <div>
              <div><label htmlFor="about">About</label></div>
                <input 
                  id="about"
                  name="about"
                  type="text"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="I like parties..."
                />
                
              </div>

              <div>
                <button
                  className="primary-button"
                  type="submit"
                >
                  Submit
                </button>
              </div>



          </section>

          <section className="right">
            <div>
              <label htmlFor="photo">Profile photo</label>
              <input 
                  id="photo"
                  name="url"
                  type="text"
                  value={formData.url}
                  onChange={handleChange}
                />
              {/* <input 
                  id="photo"
                  name="photo"
                  type="file"
                  value={''}
                  onChange={handleChange}
                /> */}

                <div className="photoContainer">
                  {
                    formData.url && (
                      <img 
                        src={formData.url} 
                        alt={'avatar'}
                      />
                    )
                  }
                </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}


