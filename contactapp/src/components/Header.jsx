import React from 'react'

export default function Header({ toggleModal, nbOfContacts }) {
  return (
    <header className="header">
        <div className="container">
            <h3>Contact List ({nbOfContacts})</h3>
            <button 
                className="btn" 
                onClick={() => toggleModal(true)}
            >
                <i className="bi bi-plus-square"></i> 
                Add New Contact
            </button>
        </div>
    </header>
  )
}

