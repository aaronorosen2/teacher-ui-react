import React, { createRef, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import "./mainChat.css";
import Avatar from "../../assets/Images/avatar.svg";
import axios from "axios";
import utils from "../../pages/auth/utils";
import Loader from "./Loader";

function MainChat(props) {
  // LocalStorage
  let Token = localStorage.getItem("token");
  let loggedUser = JSON.parse(localStorage.getItem("user"));

  // Variables
  const inputRef = useRef(null);
  const scrollBottom = useRef(null);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [messageCount, setMessageCount] = useState(0);
  const [receiveMessageCount, setReceiveMessageCount] = useState(1);
  const [load, setLoad] = useState(false);

  // Props
  const chatroom = props.chatRoom;
  const ws = props.websocket;
  console.log(ws,"-=-=-=-=-=-=-=");
  const chatroomId = props.chatRoomId;
  // console.log(ws, "======-------=====++")
  // var ws = new WebSocket(
  //   `${utils.getWebsocketHost()}/msg/channel/?token=${Token}&roomname=${chatroom}`
  // ); 
  useEffect(() => {
    // ws.onopen = function open() {
      setPage(1);

      console.log(`web socket connection created for channel ${chatroom}!!`);
      axios
        .get(
          `${utils.getHost()}/chat/get/channel/paginated_messages/?channel=${chatroomId}&records=10&p=1`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then((res) => {
          const responseData = JSON.stringify(res.data);
          const message = JSON.parse(responseData);
          setMessageCount(message.count);
          const prevMsgs = [];
          for (let i = message.results.length - 1; i >= 0; i--) {
            const receivedObj = message.results[i];
            const receivedDate = receivedObj?.created_at || "NA";
            const messageDate = new Date(receivedDate);
            const time = messageDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const date = messageDate.toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });

            const msgObj = {
              sender: receivedObj?.user.username || "NA",
              message: receivedObj?.message_text || "NA",
              time: time || "NA",
              date: date || "NA",
              profile: receivedObj?.user_profile.image || null,
            };

            prevMsgs.push(msgObj);
          }
          // prevMsgs.push(...messages);
          setMessages([...prevMsgs]);
        })
        .then(() => {
          setLoad(false);
        })
        .catch((error) => {
          console.log("error : ", error);
        });
    // };
  }, [chatroom]);

  // function handleMessageCount(value) {
  //   setReceiveMessageCount(value + 1);
  //   // props.receiveMessages({ receiveMessageCount: receiveMessageCount });
  // }

  // onMessage
  useEffect(() => {
    ws.onmessage = (evt) => {
      // listen to data sent from the websocket server
      console.log("=========on message========");
      const message = JSON.parse(JSON.stringify(evt.data));
      const receivedObj = JSON.parse(message);
console.log(chatroom , receivedObj.channel.name);
      // handleMessageCount(receiveMessageCount);
      if (chatroom === receivedObj.channel.name) {
        console.log("receivedObj...........", receivedObj);
        const receivedDate = receivedObj?.created_at || "NA";
        const messageDate = new Date(receivedDate);
        const time = messageDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const date = messageDate.toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        const msgObj = {
          sender: receivedObj?.user.username || "NA",
          message: receivedObj?.message_text || "NA",
          time: time || "NA",
          date: date || "NA",
          profile: receivedObj?.user_profile.image || Avatar,
        };
        const prevMsgs = [...messages];
        prevMsgs.push(msgObj);
        setMessages([...prevMsgs]);
      }
    };
  }, [messages]);

  // Send button
  function handleClick(event) {
    event.preventDefault();
    if (inputRef.current.value !== "") {
      ws.send(
        JSON.stringify({
          meta_attributes: "react",
          media_link: "http://www.doogle.com/",
          message_text: inputRef.current.value,
          user: "user1",
        })
      );
      document.getElementById("inp").value = "";
    }
  }

  //OnScroll fetch more data from pagination api
  function updateData(value) {
    axios
      .get(
        `${utils.getHost()}/chat/get/channel/paginated_messages/?channel=${chatroomId}&records=10&p=${value}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        const responseData = JSON.stringify(res.data);
        const message = JSON.parse(responseData);
        console.log(message, "00000");
        const prevMsgs = [];
        for (let i = message.results.length - 1; i >= 0; i--) {
          const receivedObj = message.results[i];
          const massageTime = receivedObj?.created_at || "NA";
          const messageDate = new Date(massageTime);
          const time = messageDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const date = messageDate.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });

          const msgObj = {
            sender: receivedObj?.user.username || "NA",
            message: receivedObj?.message_text || "NA",
            time: time || "NA",
            date: date || "NA",
            profile: receivedObj?.user_profile.image || null,
          };

          prevMsgs.push(msgObj);
        }
        setLoad(false);
        setMessages([...prevMsgs, ...messages]);
      });
  }
  //onScroll
  const onScroll = () => {
    if (scrollBottom.current) {
      const { scrollTop } = scrollBottom.current;
      if (scrollTop === 0) {
        setPage(page + 1);
        if (page * 10 <= messageCount) {
          setLoad(true);
          updateData(page + 1);
        }
      }
    }
  };
  //useEffect
  useEffect(() => {
    if (scrollBottom) {
      scrollBottom.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  return (
    <>
      {/* Page content */}
      <div className="header">
        <Link to="/dashboard">
          {" "}
          <button
            type="button"
            className="btn btn-secondary position-fixed top-0 end-0"
          >
            Back to Home
          </button>
        </Link>
      </div>
      {load ? <Loader /> : null}
      <div
        className="content"
        id="scroll"
        ref={scrollBottom}
        onScroll={onScroll}
      >
        {messages.map((e, i) => {
          return e.sender === loggedUser.username ? (
            <div key={i} className="container darker" id="right">
              {e.profile ? (
                <img src={e.profile} alt="Avatar" className="right" />
              ) : (
                <img src={Avatar} alt="Avatar" className="right" />
              )}
              <span className="name right">Me</span>
              <p>{`${e.message}`}</p>

              <span className="time-right">
                {e.time} {e.date}
              </span>
            </div>
          ) : (
            <div key={i} className="container" id="left">
              {e.profile ? (
                <img src={e.profile} alt="Avatar" className="right" />
              ) : (
                <img src={Avatar} alt="Avatar" className="right" />
              )}
              <span className="name right">{e.sender}</span>
              <p>{`${e.message}`}</p>
              <span className="time-left">
                {e.time} {e.date}
              </span>
            </div>
          );
        })}

        <Outlet />
      </div>

      <div className="box">
        <form>
          <input
            ref={inputRef}
            className="input_text"
            id="inp"
            type="text"
            placeholder="Enter Text Here..."
            onKeyDown={(e) => e.key === "Enter" && handleClick}
          />
          <button onClick={handleClick} className="btn btn-outline-success">
            send
          </button>
        </form>
      </div>
    </>
  );
}

export default MainChat;
