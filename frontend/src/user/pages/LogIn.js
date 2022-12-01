import React, { useContext, useEffect, useState } from 'react';
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'
import './validator.css'
import { Link } from 'react-router-dom';
const LogIn = () => {
    const auth = useContext(AuthContext)
    const intialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uid, setId] = useState(null)
    const [token,setToken] = useState(null)
    const [image,setImageData] = useState(null)
    const submitForm = () => {
        auth.login(uid,token,null,image)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let data = {
            email: formValues.email,
            password: formValues.password
        }
        fetch(`http://${auth.url}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(res => {
                setId(res.id)
                setToken(res.token)
                setImageData(res.image)
                validate(formValues, res.errors)

            })
            .catch(err => {
                console.log(err)
                event.preventDefault()
            })
        setIsSubmitting(true)
    }

    const validate = (values, data) => {
        let errors = {}
        let email, password
        if (data) {
            email = data.find(e => e.param === 'email')
            password = data.find(e => e.param === 'password')
        }
        if (email) {
            errors.email = email.msg
        }
        if (password) {
            errors.password = password.msg
        }


        setFormErrors(errors)

    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitForm()
        }
    }, [formErrors])


    return (
        <div className="authentication">
            <h2 className="h2-in-login-for-new">Öz akaundyňyza giriň!!</h2>
            <form onSubmit={handleSubmit}>
                <div className="iki-input-oz">
                <div className={`form-control`}  >
                    <label htmlFor="email" className="e-mail-login">E-Mail</label>
                    <div className={`cover ${formErrors.email && 'input--invalid '}`}>
                        <input
                        className="input-eamil-for-login"
                            type="search"
                            name="email"
                            id="email"
                            value={formValues.email}
                            onChange={handleChange}

                        />
                    </div>
                    {formErrors.email && (<span className="emeil_input">{formErrors.email}</span>)}
                </div>


                <div className={`form-control`}  >
                    <label htmlFor="password" className="input-pasword-for-login">Açar sözi</label>
                    <div className={`cover ${formErrors.password && 'input--invalid '}`}>
                        <input
                            className="input-for-pasword-in-login"
                            type="password"
                            name="password"
                            id="password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    {formErrors.password && (<span className="password_input"> {formErrors.password} </span>)}
                </div>
                </div>
                <div className="iki-div-oz">
                <div className="eger-girmedik-bolsanyz">Eger siz öň agza bolmadyk bolsaňyz <Link className="link-in-auth" to="/SignUp">Agza Bol</Link>-a basyň!!</div>
                <div className="button-in-another">
                    <Button type="submit" >
                        ICERI GIR
                    </Button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default LogIn