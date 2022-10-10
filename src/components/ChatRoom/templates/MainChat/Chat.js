import React,{useState} from "react";
import { Avatar, IconButton, ListItemAvatar } from "@mui/material";
import { Button, Card } from "react-bootstrap";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CardHeader from "react-bootstrap/esm/CardHeader";
import Modal from 'react-bootstrap/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function answer(data) {

    console.log({ data });
    {
        function popupWindow(url, windowName, win, w, h, username) {
          const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
          const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
          return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
      }
      popupWindow(data, 'test', window, 800, 600);
  }
}
export function ImageView({
    type,
    image,
    profile,
    text,
    sender,
    time,
    float = "right",
}) 
{
    console.log(image,'image...................!');
    return (
        <div className="darker" id={float}>
            <Card
                style={{
                    width: "auto",
                    height: "60%",
                    borderColor: "#464444",
                    background: "#464444",
                }}
            >
                {float === "left" ? (
                    <CardHeader style={{ borderColor: "transparent" }}>
                        <span style={{ float: "right" }}>{sender}</span>
                    </CardHeader>
                ) : null}
                {/* <img height='210px' width='auto' style={{
                      borderRadius: '10px'
                  }} src={image} /> */}

                {type === "audio/mpeg" && (
                    <li key={image}>
                        <audio src={image} controls />
                    </li>
                )}
                {type === "image/jpeg" || type === "image/png" && (
                    <img
                        height="210px"
                        width="auto"
                        style={{
                            borderRadius: "10px",
                        }}
                        src={image}
                    />
                )}
                {type === "message/videocall" && (
                <p style={{ marginLeft: "10px" }}>videoCallEnd</p>

                )}
                <p style={{ marginLeft: "10px" }}>{text !== "NA" ? text : null}</p>
                <span className="time-right">{time}</span>
            </Card>
                
        </div>
    );
}

export function Answer({
    type,
    image,
    profile,
    text,
    sender,
    time,
}) {
    let loggedUser = JSON.parse(localStorage.getItem("user"));
    console.log(type, image, loggedUser, sender, '=============type======================image=========');
    // const [status, setStatus] = useState(true);
    const [open, setOpen] = useState(true);
    return (
        <div>
       <Dialog
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
      >
        <DialogTitle id="alert-dialog-title" >
          {"Admin is calling you"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h6>Do you Want to Pick The Call</h6>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="bg-success" onClick={() => {answer(image); setOpen(false)}}  autoFocus>
            Start
          </Button>
          <Button className="bg-danger" onClick={() => setOpen(false)}>End</Button>
        </DialogActions>
      </Dialog>
        </div>
        
    );
}

export function TextView({ sender, profile, text, time, float = 'right' }) {
    return (
        <div className="container darker" id={float}>
            <Card style={{
                width: 'auto',
                height: '60%',
                borderColor: "#aaa", background: 'transparent',
                borderRight: '0'
            }}>
                <ListItemAvatar style={{ float: 'right' }}>
                    <Avatar alt={sender} src={profile} style={{
                        marginLeft: '10px',
                        height: '35px',
                        width: '35px',
                        float: 'right'
                    }} />
                    {sender === 'Me' ?
                        <span className="name right">Me</span>
                        :
                        <span className="name right">{sender}</span>
                    }
                </ListItemAvatar>
            </Card>
            <p style={{ marginLeft: 0 }}> {text}</p>
            <p className="time-right" style={{ marginLeft: 0 }}>{time}</p>
        </div>
    )
}
export function ImgUpload({ onChange, src }) {
    return (
        <IconButton color="primary" aria-label="upload picture" component="label" >
            <input hidden accept="image/*" type="file" onChange={onChange} />
            <AttachFileIcon />
        </IconButton>
    );
};


export function ImageShow({ filePreviewUrl }) {
    return (
        <div className="image-show-view">
            <img
                src={filePreviewUrl}
                height={'40%'}
                width={'80%'}
            />
        </div>
    );
};
export function ChatHeader({ name, props, type, image, ws = null }) {
    return (
        <div className="profile-header">
            <div className="header-chat">
                <ListItemAvatar onClick={() => props.show({ show: true, type: type, websocket: ws })}>
                    <Avatar alt={name} src={image} />
                </ListItemAvatar>
                <li className="" style={{ color: 'white', fontWeight: 'bold' }} >{name}</li>

            </div>
        </div>
    )
}