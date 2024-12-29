import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getContact, deleteContact } from '../api/ContactService';
import { toastSuccess, toastError, toastInfo } from '../api/ToastService';

export default function ContactDetail({ updateContact, updateImage, refreshPage }) {

    const inputRef = useRef();
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        title: "",
        status: "",
        photoUrl: "",
    });

    const { id } = useParams();

    const fetchContact = async (id) => {
        try {
            const { data } = await getContact(id);
            setContact(data);
            console.log(data);
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const selectImage = () => {
        inputRef.current.click();
    };

    const updatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("id", id);
            await updateImage(formData);
            setContact((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}` }));
            console.log('Profile photo has been changed.');
            toastSuccess('Profile photo updated.');
        } catch (error) {
            console.log(error);
            toastError(error.message);
        }
    };

    const onChange = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value});
    };

    const onUpdateContact = async (event) => {
        event.preventDefault();
        await updateContact(contact);
        fetchContact(id);
        toastSuccess('Contact Updated.');
    };

    const onDeleteContact = async () => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            await deleteContact(id);
            toastSuccess('Contact Deleted.');

            navigate('/contacts');
            refreshPage();
        } else {
            toastInfo('Contact deletion cancelled.');
        }
    }

    useEffect(() => {
        fetchContact(id);
    }, []);

    
  return (
    <>
        <Link to={"/contacts"} className="link" onClick={refreshPage}>
            <i className="bi bi-arrow-left"></i> Back to list
        </Link>

        <div className="profile">
            <div className="profile__details">
                <img src={contact.photoUrl} alt={`Profile photo of ${contact.name}`} />
                <div className="profile__metadata">
                    <p className="profile__name">{contact.name}</p>
                    <p className="profile__muted">JPG, GIF or PNG. Max size of 10MB</p>
                    <button onClick={selectImage} className="btn">
                        <i className="bi bi-cloud-upload"></i> Change Photo
                    </button>
                </div>
            </div>

            <div className="profile__settings">
                <form onSubmit={onUpdateContact} className="form">
                    <div className="user-details">
                        <input type="hidden" defaultValue={contact.id} name="id" required />
                        <div className="input-box">
                            <span className="details">Name</span>
                            <input type="text" value={contact.name} onChange={onChange} name="name" required />
                        </div>

                        <div className="input-box">
                            <span className="details">Email</span>
                            <input type="text" value={contact.email} onChange={onChange} name="email" required />
                        </div>

                        <div className="input-box">
                            <span className="details">Phone</span>
                            <input type="text" value={contact.phone} onChange={onChange} name="phone" required />
                        </div>

                        <div className="input-box">
                            <span className="details">Address</span>
                            <input type="text" value={contact.address} onChange={onChange} name="address" required />
                        </div>

                        <div className="input-box">
                            <span className="details">Title</span>
                            <input type="text" value={contact.title} onChange={onChange} name="title" required />
                        </div>

                        <div className="input-box">
                            <span className="details">Status</span>
                            <input type="text" value={contact.status} onChange={onChange} name="status" required />
                        </div>
                    </div>
                    
                    <div className="form_footer profile_btns">
                        <button type="submit" className="btn">Save</button>
                        <button onClick={onDeleteContact} type="button" className="btn btn-danger">Delete</button>
                    </div>
                </form>
            </div>
        </div>

        <form style={{ display: 'none' }}>
            <input 
                type="file"
                name="file" 
                ref={inputRef} 
                onChange={(event) => updatePhoto(event.target.files[0])} 
                accept="image/*"
            />
        </form>
    </>
  )
}

