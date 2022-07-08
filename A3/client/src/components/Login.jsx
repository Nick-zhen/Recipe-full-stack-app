import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa";
export default function Login() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    })

    const { name, password, password2} = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div>
      <section className="heading">
        <h1>
            <FaSignInAlt /> Login
            <p>Login and start add recipes</p>
        </h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={name}
                placeholder='Enter your name'
                onChange={onChange}
                />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
