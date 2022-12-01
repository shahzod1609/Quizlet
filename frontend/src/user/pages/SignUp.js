import React, { useContext, useEffect, useState } from 'react';
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import { AuthContext } from '../../shared/context/auth-context'
import './Auth.css'
import './validator.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input'

const SignUp = () => {

    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const intialValues = { name: "", email: "", image: "", password: "", confirmPassword: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uid, setId] = useState(null)
    const [previewUrl, setPreviewUrl] = useState()
    const [token,setToken] = useState(null)
    const [imageData,setImageData]=useState(null)

    const submitForm = () => {
        auth.login(uid,token,null,imageData)
        navigate('/')
    }

    const handleChange = (e) => {
        let { name, value } = e.target
        if (name === "image")
            value = e.target.files[0]
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('name', formValues.name)
        formData.append('email', formValues.email)
        formData.append('password', formValues.password)
        let imageUrl = null 
        if(imageUrl)
            imageUrl=formValues.image
        formData.append('image', formValues.image )
        formData.append('confirmPassword', formValues.confirmPassword)
        fetch(`http://${auth.url}/auth/signup`, {
            method: 'PUT',
            body: formData
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
                alert('Yalnyshlyk yuze cykdy')
                event.preventDefault()
            })
        setIsSubmitting(true)
    }


    const validate = (values, data) => {
        let errors = {}, name, email, password, confirmPassword
        if (data) {
            name = data.find(e => e.param === 'name')
            email = data.find(e => e.param === 'email')
            password = data.find(e => e.param === 'password')
            confirmPassword = data.find(e => e.param === 'confirmPassword')
        }
        if (name) {
            errors.name = name.msg
        }
        if (email) {
            errors.email = email.msg
        }
        if (password) {
            errors.password = password.msg
        }
        if (confirmPassword) {
            errors.confirmPassword = confirmPassword.msg
        }
        setFormErrors(errors)



    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submitForm()
        }
    }, [formErrors])



    useEffect(() => {
        if (!formValues.image) {
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(formValues.image)

    }, [formValues.image])

    return (
        <div className="authentication">
            <form onSubmit={handleSubmit}>
                <div className="agza-bol-we">
                    <h2 className="h2-agza-bol">Agza Bol</h2>
                        <div className={`form-control`}  >
                            <div className="flex-img-and-emeil">
                            <label className="img-label">
                                <div className="input-type-photo">
                                    {
                                        previewUrl &&
                                        <img
                                        className="img-signup-login"
                                            src={previewUrl}
                                        />
                                    }
                                </div>
                                <label>
                                    <input
                                        className="input-image-type-img"
                                        type="file"
                                        name="image"
                                        className={`input-add-photo`}
                                        onChange={handleChange}
                                    />
                                </label>
                            </label>
                        <div className="name-and-email">
                        <label htmlFor="email" className="text-label">Adyň</label>
                        <div className={`cover ${formErrors.name && 'input--invalid '}`}>
                            <input
                                className="input-type-search"
                                id="name"
                                type="search"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                            />
                        </div>
                        {formErrors.name && (<span className="emeil_input1">{formErrors.name}</span>)}

                    
                    <div className="mail-in-somewhere">
                        <label htmlFor="email" className="text-label">E-Mail</label>
                        <div className={`cover ${formErrors.email && 'input--invalid '}`}>
                            <input
                                className="input-type-email"
                                id="email"
                                type="search"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                        </div>
                        {formErrors.email && (<span className="emeil_input2">{formErrors.email}</span>)}
                            </div>
                            </div>
                            </div>
                        <div className="acar-sozi">
                            <div className="acar-soz1">
                            <label htmlFor="password" className="text-label">Açar sozi</label>
                            <div className={`cover ${formErrors.password && 'input--invalid '}`}>
                                <input
                                    className="input-type-password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formValues.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {formErrors.password && (<span className="emeil_input3"> {formErrors.password} </span>)}
                            </div>
                            <div className="acar-soz2">
                            <label htmlFor="password" className="text-label">Açar sözini tassykla</label>
                            <div className={`cover ${formErrors.confirmPassword && 'input--invalid '}`}>
                                <input
                                    className="input-type-password2"
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={formValues.confirmPassword}
                                    onChange={handleChange}
                                />

                            {formErrors.confirmPassword && (<span className="emeil_input4"> {formErrors.confirmPassword} </span>)}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="eger-bilen-button">
                    <div className="egerli">Eger-de siz öň agza bolan bolsaňyz <Link to="/LogIn" className="link-in-auth">Içeri gire</Link> basyň!!</div>
                <Button type="submit" className="pasword_input">
                    AGZA BOL
                </Button>
                </div>
            </form>

        </div>
    )
}


export default SignUp