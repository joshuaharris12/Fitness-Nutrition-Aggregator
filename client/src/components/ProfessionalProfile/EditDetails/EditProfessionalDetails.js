import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Option } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useDispatch  } from 'react-redux';
import "./EditProfessionalDetails.css";
import { updateProfessional } from '../../../actions/professionals';

const EditProfessionalDetails = (props) => {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [isValidID, setIsValidID] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [instagramLink, setInstagramLink] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState(new Date());
    const [password, setPassword] = useState("");
    const [isBanned, setIsBanned] = useState(false);
    const [tags, setTags] = useState([]);
    const [ID, setID] = useState("");
    const [profession, setProfession] = useState("");

    useEffect(() => {
        const id = props.match.params.id;
        if (id !== undefined) {
            fetch(`http://localhost:5000/professionalUsers/${id}`)
            .then(response => {
                if (!response.ok) return "error"
                else return response.json();
            })
            .then(data => {
                if (data === "error") {
                    setIsValidID(false);
                } else {
                    setIsValidID(true);
                    setName(data.name);
                    setAddress(data.address);
                    setUsername(data.username);
                    setEmail(data.email);
                    setBio(data.bio);
                    setInstagramLink(data.instagramLink);
                    setYoutubeLink(data.youtubeLink);
                    setGender(data.gender);
                    setDob(data.dob);
                    setPassword(data.password);
                    setIsBanned(data.isBanned);
                    setTags(data.tags);
                    setID(data._id);
                    setProfession(data.profession);
                }
            })
        }
        
    }, [dispatch]);

    function handleSubmit(event) {
        if (isValidID) {
            const editForm = event.currentTarget;
            if (editForm.checkValidity()) {
                event.preventDefault();
                const updatedProfile = {
                    name: name,
                    username: username,
                    address: address,
                    email: email,
                    bio: bio,
                    instagramLink: instagramLink,
                    youtubeLink: youtubeLink,
                    gender: gender,
                    dob: dob,
                    password: password,
                    isBanned: isBanned,
                    tags: tags,
                    profession: profession,
                }
                setValidated(true);
                dispatch(updateProfessional(ID, updatedProfile));
                console.log("Done");
                window.alert("Details Saved!");
                window.location.href = `/professional/profile/${ID}`
            } else {
                event.preventDefault();
                event.stopPropagation();
            }
        } 
    }

    return (
        <div className="formContainer">
            <h2 className="title">Edit Details</h2>
            <hr className="seperator"/>
            <div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label className="label">Name</Form.Label>
                        <Form.Control 
                            className="inputItem"
                            id="name" 
                            name="name" 
                            value={name} 
                            placeholder="Name" 
                            onChange={(e) => setName(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Address</Form.Label>
                        <Form.Control 
                            className="inputItem"
                            id="address" 
                            name="address" 
                            value={address} 
                            placeholder="Address" 
                            onChange={(e) => setAddress(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Username</Form.Label>
                        <Form.Control 
                            className="inputItem"
                            id="username" 
                            name="username" 
                            value={username} 
                            placeholder="Username" 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Email</Form.Label>
                        <Form.Control 
                            className="inputItem"
                            id="email" 
                            name="email" 
                            value={email} 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Gender</Form.Label>
                        <Form.Control 
                            className="inputItem"
                            as="select"
                            id="gender" 
                            name="gender" 
                            value={gender} 
                            placeholder="Gender" 
                            onChange={(e) => setGender(e.target.value)} 
                            required
                        >
                            <option>Male</option> 
                            <option>Female</option> 
                            <option>Other</option> 
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Bio</Form.Label>
                        <Form.Control 
                            className="inputItem"
                            id="bio" 
                            as="textarea" 
                            name="bio" 
                            value={bio} 
                            placeholder="Bio" 
                            onChange={(e) => setBio(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">Instagram Username</Form.Label>
                        <Form.Control 
                            className="inputItem"
                            id="instagramLink" 
                            name="instagramLink" 
                            value={instagramLink} 
                            placeholder="Instagram Username" 
                            onChange={(e) => setInstagramLink(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="label">YouTube Username</Form.Label>
                        <Form.Control
                            className="inputItem" 
                            id="youtubeLink" 
                            name="youtubeLink" 
                            value={youtubeLink} 
                            placeholder="YoutubeLink" 
                            onChange={(e) => setYoutubeLink(e.target.value)}    
                        /><br/>
                        <Button type="submit" className="actionButton">Save</Button>
                        <Button type="button" className="actionButton" onClick={() => window.location.href=`/professional/profile/${ID}`}>Close</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    ); 
}

export default EditProfessionalDetails;
