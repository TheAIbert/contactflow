import React from 'react'
import Contact from './Contact'

export default function ContactList({ data, currentPage, getAllContacts }) {
  return (
    <main className="main">
        {data?.content?.length === 0 && <div>No Contacts</div>}

        <ul className="contact__list">
            {data?.content?.length > 0 
            && data.content.map(contact => <Contact contact={contact} key={contact.id} />)}
        </ul>

        {data?.content?.length > 0 && data?.totalPages > 1 && 
            <div className="pagination">
                <a 
                    onClick={() => getAllContacts(currentPage - 1)}
                    className={0 === currentPage ? 'disabled' : ''}
                >
                    &laquo;
                </a>

                {/* Array.from({length: data.totalPages}, (_, i) => i + 1) */}
                {data && [...Array(data.totalPages).keys()].map((page, _) => 
                    <a 
                        onClick={() => getAllContacts(page)} 
                        className={currentPage === page ? 'active' : ''} 
                        key={page}
                    >
                        {page + 1}
                    </a>
                    )
                }

                <a 
                    onClick={() => getAllContacts(currentPage + 1)}
                    className={currentPage === data.totalPages - 1 ? 'disabled' : ''}
                >
                    &raquo;
                </a>
            </div>  
        }
    </main>
  )
}
