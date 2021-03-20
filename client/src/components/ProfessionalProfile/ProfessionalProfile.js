import React, { useEffect, useState } from "react";
import '../Profile.css';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessional } from '../../actions/professionals';
import { getServices } from '../../actions/services';
import { updateBasicUser, getBasicUser } from '../../actions/basicUsers';
import { Button } from 'react-bootstrap';
import ProfessionalNavbar from '../Navbar/ProfessionalNavbar';
import Navbar from "../Navbar/Navbar";

const ProfessionalProfile = (props) => {
    const dispatch = useDispatch();
    const [videoUrls, setVideoUrls] = useState([]);
    const [isProfessional, setIsProfessional] = useState(props.isProfessional);
    const basicUserID = props.match.params.clientID;
    const professionalUserID = props.match.params.professionalID;
    const [basicUser, setBasicUser] = useState({});


    // Get Professional & basic User if a basicUser is viewing the profile
    useEffect(() => {
        dispatch(getProfessional(professionalUserID));
    }, [dispatch]);

    useEffect(() => {
       if (basicUserID !== undefined) {
            dispatch(getBasicUser(basicUserID));
    }
 }, [dispatch]);


    let professionalUser = useSelector((state) => state.professional);
 let basicUserProfile = useSelector((state) => state.basicUsers);
     useEffect(() => {
         setBasicUser(basicUserProfile);
     }, [basicUserProfile]);

     // Get Services
     useEffect(() => {
         dispatch(getServices());
     }, [dispatch]);

    const services = useSelector((state) => state.services);
    const myServices = services.filter(service => service.userID === professionalUserID);
  
    function generateEditDetailsLink(isProfessional) {
        if (isProfessional) {
            return (<h5 className="editLink" onClick={() => window.location.href = `/professional/edit/${professionalUser._id}`}>Edit my details</h5>);
        }
    }

    function generateEditServicesLink(isProfessional) {
        if (isProfessional) {
            return (<h5 className="editLink" onClick={() => window.location.href = `/professional/services/edit/${professionalUserID}`}>Edit my services</h5>);
        } 
    }

    function purchaseBundle(event) {
        event.preventDefault();
        const bundleID = event.target.value;
        let bundles = basicUser.bundles;
        if (bundleID !== undefined) {
            if (bundles !== undefined) {
                if (!bundles.includes(bundleID)) {
                    bundles.push(bundleID);
                    basicUser.bundles = bundles;
                }
            } else {
                basicUser.bundles = [bundleID];
            }
            // update basicUser
            dispatch(updateBasicUser(basicUser._id, basicUser))
        }
    }

    function generateServices() {
        if (isProfessional) {
            return (
                <div>
                     { generateEditServicesLink(isProfessional) }
                     <h2 className="pageText">Services</h2>
                    <ul>
                        {
                            myServices.map((service, index) => {
                                return (
                                     <li key={index} className="serviceList">
                                         <div className="serviceColumn">
                                             <h4>{service.title}</h4>
                                             <p>{service.description}</p>
                                         </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            );
        } else {
            return (
                <div>
                     <h2 className="pageText">Services</h2>
                    <ul>
                        {
                            myServices.map((service, index) => {
                                return (
                                     <li key={index} className="serviceList">
                                         <div className="serviceColumn">
                                            <h4>{service.title}</h4>
                                            <p>{service.description}</p>
                                            <Button 
                                                value={service._id}
                                                className="purchaseButton"
                                                onClick={purchaseBundle}
                                             >
                                                Purchase
                                            </Button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            );
        }
    }

    return (
        <div>
            { generateNavbar() }
            <div className="sectionContainer">
                <div className="section">
                    <div>
                        { generateEditDetailsLink(isProfessional)  }
                    </div>
                    <ProfileInfo profile={professionalUser} />
                </div>
                <div className="section">
                    {
                        generateServices()
                    }
                </div>
            </div>
        </div>
    );

    function generateNavbar() {
        if (isProfessional) {
            return <ProfessionalNavbar />;
        } else {
            return <Navbar />;
        }
    }
}

export default ProfessionalProfile;