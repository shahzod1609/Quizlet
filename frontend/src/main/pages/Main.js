import React, { useContext, useEffect, useState } from 'react';
import './main.css'
import { AuthContext } from '../../shared/context/auth-context'

import Card from './Card'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

let items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
]

const Main = (e) => {
    let { search } = useLocation();
    const dataVal = {
        error: false,
        title: '',
        message: '',
        term: '',
        description: ''
    }

    const query = new URLSearchParams(search);
    const folderId = query.get('folderid');
    const edit = query.get('edit')
    const idModule = query.get('id')

    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const dataMM = [
        {
            id: 1,
            term: '',
            definition: '',
            image: ''
        },
        {
            id: 2,
            term: '',
            definition: '',
            image: ''
        },
        {
            id: 3,
            term: '',
            definition: '',
            image: ''
        },
        {
            id: 4,
            term: '',
            definition: '',
            image: ''
        }
    ]

    const [dataModule, setDataModule] = useState(dataMM)
    const [dataMod, setDataMod] = useState({ title: '', description: '' })
    const [dataValidation, setDataValidation] = useState(dataVal)
    const [card, setCard] = useState(items)
    const [cardNumber, setCardNumber] = useState(1)
    const [validationError, setValidationError] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const addCard = () => {
        setCard([...card, { id: cardNumber + 1 }])
        // items.push({id:cardNumber+1})  
        setCardNumber(cardNumber + 1)
        setDataModule([
            ...dataModule,
            {
                id: dataModule.length + 1,
                term: '',
                definition: '',
                image: ''
            }
        ])
    }

    useEffect(() => {
        if (edit) {
            const fetchedCard = async () => {
                let card = await fetch(`http://${auth.url}/admin/cards/` + idModule, {
                    method: 'GET',
                    headers: {
                        'userId': auth.userId,
                        'Content-Type': 'application/json'
                    }
                })
                card = await card.json()
                setDataModule([...card.cards])
                setDataMod({ ...card.module })
            }
            fetchedCard()
        }
    }, [])

    const deleteCard = (id) => {

        let newItem = [...dataModule].filter(item => item.id !== id)
        setDataModule(newItem)
        // return items.filter(item=>{item.id!==id})
    }

    const handleChange = (e, index, modul) => {
        if (modul) {
            setDataMod({ ...dataMod, title: e.target.value })
        } else {

            let { name, value } = e.target
            if (name === 'image')
                value = e.target.files[0]
            setDataModule(prevValue =>
                [...prevValue].map((item, indexItem) =>
                    indexItem === index ? ({ ...item, [name]: value }) : item)
            )
        }
        if (dataValidation.error)
            validate(dataMod, dataModule)
    }

    const validate = (moduleData, cardsData, error) => {

        if (!moduleData.title) {
            setDataValidation({
                error: true,
                message: 'Bosh bolmaly dal'
            })
            error = true
        }

        if (cardsData.length < 4) {
            setDataValidation({
                error: true,
                message: 'kartochklaryn sany 4den kop bolmaly',
            })
            error = true
        } else 
            if (!cardsData[0].term || !cardsData[0].definition || !cardsData[1].term || !cardsData[1].definition ||
                !cardsData[2].term || !cardsData[2].definition || !cardsData[3].term || !cardsData[3].definition) {
                setDataValidation({
                    error: true,
                    message: 'Bosh bolmaly dal',
                })
                error = true
            }
        if (error) {
            setValidationError(true)
            window.scrollTo(0, 0)
        } else {
            setDataValidation(dataVal)
            setValidationError(false)
        }
        setIsSubmitting(false)

    }


    const onSubmit = (e) => {
        e.preventDefault()
        let error = false
        validate(dataMod, dataModule, error)    
        setIsSubmitting(true)
    }

    useEffect(() => {

        if (dataValidation.message.length === 0 && isSubmitting) {
            submitForm()
        }


    }, [dataValidation])

    const submitForm = async () => {
        let formData = new FormData


        formData.append('moduleTitle', dataMod.title)
        formData.append('moduleDescription', dataMod.description)


        const fileReader = new FileReader()
        for (let index = 0; index < dataModule.length; index++) {
            if (!dataModule[index].term || !dataModule[index].definition) {
                continue
            }
            let imagePathh = null
            if (dataModule[index].image instanceof File) {

                imagePathh = dataModule[index].image.name
            } else
                if (dataModule[index].image) {

                    imagePathh = dataModule[index].image
                }
            formData.append('imagePath[]', imagePathh)
            formData.append('image[]', dataModule[index].image)

            formData.append('term[]', dataModule[index].term)
            formData.append('definiton[]', dataModule[index].definition)

        }
        let method = 'POST'
        let url = `http://${auth.url}/admin/module`
        if (folderId !== null)
            url = `http://${auth.url}/admin/module?folderid=${folderId}`
        if (edit) {
            method = 'PUT';
            url = `http://${auth.url}/admin/module/${idModule}`
        }
        try {
            let data = await fetch(url, {
                method: method,
                body: formData,
                headers: {
                    'userId': auth.userId,
                    'authorization': `Bearer ${auth.token}`
                }
            })
            if (!edit) {
                navigate('/')
            }
            else {
                navigate(`/module-in/${idModule}`)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="all-of-div" id="here">
            <div className="header-div">
                <div className="title1-div">
                    <input
                        onChange={(e) => { handleChange(e, 0, true) }}
                        type="text"
                        id="title"
                        name="title"
                        className={`title-input ${validationError && !dataMod.title ? 'red_underline' : ''}`}
                        placeholder="Modulyň adyny şu taýyk ýaz!!"
                        value={dataMod.title}
                    />
                    <div><h3 className={`h13 ${validationError && !dataMod.title ? 'red_word' : ''}`}>Modulyň ady</h3></div>
                </div>
                <div className="des1-div">
                    <input
                        onChange={(e) => { setDataMod({ ...dataMod, description: e.target.value }) }}
                        type="text"
                        id="des"
                        title="des"
                        className="des1-input"
                        placeholder="Düşündirilişi şu taýyk ýaz!!"
                        value={dataMod.description}
                    />
                    <h3 className="h13">Düşündirilişi</h3>
                </div>
            </div>
            {
                dataValidation.error &&
                <div className="validation-message-barla-or-something-else">{dataValidation.message}</div>

            }
            <form onSubmit={onSubmit}>
                {
                    dataModule.map((item, index) => {

                        return (
                            <div key={index} className="all-module-div">
                                <Card
                                    deleteCard={deleteCard}
                                    item={item}
                                    index={index}
                                    handleChange={handleChange}
                                    dataValidation={dataValidation}
                                    error={validationError}
                                />
                            </div>
                        )
                    })
                }
                <div onClick={addCard} className="add-button" ><div className="add"></div> Kard goş </div>
                <div className="add-place-of-moduleIn"><button type="submit" className="save-button">Ýatda sakla</button></div>
            </form>

        </div>
    )
}


export default Main;