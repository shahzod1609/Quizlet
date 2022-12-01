import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import './card.css'

function Card({ deleteCard, dataValidation, error, handleChange, index, item }) {
    const [previewUrl, setPreviewUrl] = useState()
    const auth = useContext(AuthContext)
    useEffect(() => {
        if (!item.image) {
            return
        } else
            if (item.image instanceof File) {
                const fileReader = new FileReader()
                fileReader.onload = () => {
                    setPreviewUrl(fileReader.result)
                }
                fileReader.readAsDataURL(item.image)
            } else
                setPreviewUrl(`http://${auth.url}/${item.image}`)
    }, [item.image])
    
    return (
        <div id={index} className="module-div">
            <div className="all-top-element">
                <div className="text-id-att-top-level" >{index + 1}</div>
                <div className="button_delete" onClick={() => deleteCard(item.id)}></div>
            </div>
            <div className="term-and-others">
                <div className="term-and-others-2">
                    <div className="term-div">
                        <input
                            value={item.term}
                            onChange={(e) => handleChange(e, index)}
                            type="text"
                            name="term"
                            className={`term ${error && (index === 0 ||index === 1 ||index === 2 || index === 3) && !item.term ? 'red_underline' : ''
                                }`}
                            placeholder="Term"
                        />
                        <h4 className={
                            ` text-css-y ${error && (index === 0 ||index === 1 ||index === 2 || index === 3) && !item.term ? 'red_word' : ""
                            }`
                        }  >Termin</h4>
                    </div>
                    <div className="def-div">

                        <input
                            onChange={(e) => handleChange(e, index)}
                            type="text"
                            name="definition"
                    
                            className={`def ${error && (index === 0 ||index === 1 ||index === 2 || index === 3) && !item.definition ? 'red_underline' : ''
                                }`}
                            placeholder="Düşündirilişi"
                            value={item.definition}
                        />
                        <h4 className={
                            ` text-css-y ${error && (index === 0 ||index === 1 ||index === 2 || index === 3) && !item.definition ? 'red_word' : ''
                            }`
                        }
                        > Düşündirilişi!!</h4>
                    </div>
                </div>

                {
                    !item.image ?

                        <label className="input-image-inModule">
                            <div className="input-type-file-inModule"></div>
                            <input
                                onChange={(e) => handleChange(e, index)}
                                type="file"
                                name="image"
                                className="input-type-real-input"

                            />
                        </label>
                        :
                        <div className="image-to-inModule">
                            <img
                                className="image-origal-place"
                                src={
                                    previewUrl && previewUrl
                                }
                            />
                        </div>
                }

            </div>
        </div>
    )
}
export default Card;