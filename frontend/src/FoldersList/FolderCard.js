import React from 'react';
import { Link } from 'react-router-dom';
import './FolderCard.css'

function FolderCard({ word }) {
    return (
        <Link to={`/papka-in?folderid=${word.id}`} className="folder-card-1">
            <div className="flex-for-papka-list">
                <div className="folder-icon-forCard"></div>
                <div>

                    {/* Modulun name */}
                    <div className="folder-modul-name">{word.title}</div>
                    {/* module secription */}
                    <div className="folder-descrip"> {word.description}</div>
                
            {/* module nace stuk */}
            <div className="folder-descrip"> {word.totalModule ? word.totalModule : 0} modul{word.totalModule > 1 && ''} </div>
            </div>
            </div>

        </Link>
    );
}

export default FolderCard;