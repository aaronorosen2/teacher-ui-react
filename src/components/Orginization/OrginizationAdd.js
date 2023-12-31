
import React, { useState } from 'react'
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

import axios from "axios";
import utils from "../../pages/auth/utils";
import { Button } from "react-bootstrap";
import { useDropzone } from 'react-dropzone'
import { ImageShow } from "../ChatRoom/templates/MainChat/Chat";
import "./addorg.css";
import "./orginization.css";
import "../../css/auth/auth.scss";


export const AddOrg = (props) => {
    let Token = localStorage.getItem("token");
    let loginFields = [
        {
            placeholder: "Orginization name",
            value: "",
            name: "Name",
            type: "text",
            hasError: false,
        },
        {
            name: "Address",
            placeholder: "Orginization address",
            value: "",
            type: "text",
            hasError: false,
        },
        {
            name: "Phone Number",
            placeholder: "Orginization Phone No. ",
            value: "",
            type: "text",
            hasError: false,
        },

        {
            name: "About",
            placeholder: "About orginization ",
            value: "",
            type: "text",
            hasError: false,
        },
        {
            name: "Email",
            placeholder: "Orginization Email-Id",
            value: "",
            type: "email",
            hasError: false,
        },
    ];


    const [fields, updateFields] = useState(loginFields);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [state, setState] = useState({
        file: "",
        filePreviewUrl: ''

    });

    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const successBanner = {
        color: "#fff",
        backgroundColor: "green",
        borderRadius: 2, padding: '1%',
        justifyContent: 'center'
    };
    const errorBanner = {
        color: "#fff",
        backgroundColor: "red",
        borderRadius: 2, padding: '1%',
        justifyContent: 'center'
    }

    const setFieldValue = (value, index) => {
        let fieldData = [...fields];
        fieldData[index].value = value;
        fieldData[index].address = value;
        fieldData[index].phoneNumber = value;
        fieldData[index].about = value;
        fieldData[index].email = value;

        fieldData[index].hasError = value === "";
        updateFields(fieldData);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        let requestObject = {};
        fields.forEach((field) => {
            requestObject[field.name] = field.value;
            requestObject[field.address] = field.value;
            requestObject[field.phoneNumber] = field.value;
            requestObject[field.about] = field.value;
            requestObject[field.email] = field.value;

        });
    };

    const [alert, setAlert] = useState();

    async function addorg(event) {
        event.preventDefault();
        let file_url;
        if (isSelected) {
            let formImage = new FormData();
            console.log(formImage)
            formImage.append("file", selectedFile);
            await axios
                .post(`${utils.getHost()}/profile/upload`, formImage)
                .then((resp) => {
                    file_url = resp.data.file_url;
                    console.log({ resp })

                })
                .then(() => {
                    setState({ file: false });
                })
                .catch((error) => {
                    setState({ file: false });

                    alert("connection is breaked", error);
                });
        } else {
            file_url = null;
        }
        let items = [...fields];
        let valu = {
            meta_attributes: items[0].value,
            address: items[1].value,
            about: items[2].value,
            phone_number: items[2].value,
            about: items[3].value,
            email: items[4].value,
            image: file_url ? file_url : state.filePreviewUrl
        };
        axios
            .post(
                `${utils.getHost()}/chat/get/org`,
                valu,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    },
                }
            )
            .then((response) => {
                const org = response.data.data;
                if (response.status == 203) {
                    console.log(response?.data?.error);
                    setErrorAlert(true)
                    if (response?.data?.error?.meta_attributes)
                        setAlert(`Orginization Name. is ${response?.data?.error?.meta_attributes}`)
                    else
                        setAlert(`PhoneNumber : ${response?.data?.error?.phone_number}`)
                } if (response.status == 201) {
                    setSuccessAlert(true)
                    setTimeout(() => {
                        props.updateNewOrginization({
                            meta_attributes: org.meta_attributes,
                            orgId: org.id,
                            user: org.user,
                            created_at: org.created_at,
                            address: org.address,
                            phoneNumber: org.phoneNumber,
                            about: org.about,
                            email: org.email,
                            thumb: org.image
                        })
                    }, 4999);
                }
            })
            .catch((error) => {

            });
    }
    const { getRootProps, getInputProps } = useDropzone({
        accept:{ 'image/*':[]},
        onDrop: (event) => {
            setSelectedFile(event[0]);
            setIsSelected(true);
            let props = event.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
            setState({
                file: event[0],
                filePreviewUrl: props[0].preview,
            });
        }
    });

    return (
        <>
            <div className={"centered-data"}>
                {successAlert &&
                    <div style={successBanner}>
                        <span className="d-flex justify-content-center">
                            {`${fields[0].value} is Created Successfully`}
                        </span>
                    </div>
                }
                {errorAlert &&
                    <div style={errorBanner}>
                        <span className="d-flex justify-content-center">
                            {`${alert}`}
                            <span > &nbsp;&nbsp;&nbsp;&nbsp;x </span>
                        </span>
                    </div>
                }
            </div>
            <div
                className={"login-section page-container"}
                style={{ display: "flex" }}
            >
                <div className={"auth-container"}>
                    <Button onClick={() => {
                        props.goBack()
                    }}>Back </Button>
                    <div className={"auth-content"}>
                        <div className={"auth-header"}>
                            <h4>Add Orginization</h4>
                        </div>
                        <form
                            method={"post"}
                            action={""}
                            onSubmit={(event) => handleFormSubmit(event)}
                            style={{ justifyContent: 'center' }}
                        >
                            <div className={"input-list centered-data"}>
                                {fields.map((field, index) => {
                                    return (
                                        <div className={`input-control`} key={field.placeholder} >
                                            {field.name}
                                            <input
                                                type={field.type}
                                                value={field.value}
                                                name={field.name}
                                                About={field.About}
                                                Address={field.Address}
                                                onChange={(event) =>
                                                    setFieldValue(event.target.value, index)
                                                }
                                                placeholder={field.placeholder}
                                                className={`${field.hasError ? "input-error" : ""}`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            {state.file ? (
                                <CancelSharpIcon
                                    style={{ float: 'right', padding: '5px' }}
                                    onClick={() => {
                                        setState({
                                            file: null,
                                        });
                                    }}
                                    color="primary"
                                    fontSize="large"
                                />
                            ) : (
                                null)}
                            <div style={{
                                margin: "0px 100px",
                                position: 'relative',
                                top: '50px',
                                justifyContent: "center",
                                cursor: "pointer",
                                height: "150px",
                                width: "50%",
                                borderRadius: "5px",
                                backgroundColor: '#D2F1EF'
                            }}
                                {...getRootProps()}>
                                {state.filePreviewUrl &&
                                    <ImageShow filePreviewUrl={state.filePreviewUrl} />}
                                <input {...getInputProps()} />
                                {!state.filePreviewUrl &&
                                    <p style={{
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        paddingTop: '60px'
                                    }} >{`Drag or click to select files`}</p>
                                }
                            </div>
                            <div>
                                <div className={"button-container "} style={{ marginTop: '20%' }}>
                                    <button onClick={addorg}
                                        disabled={fields.filter(field => field.value === '').length > 0}
                                    >Add</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </>
    );
};
