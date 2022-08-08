import React, {useEffect, useState} from 'react';
import {withRouter} from "react-router-dom";
import {getUser} from "../../network";
import style from "../login/login.module.css";
import {Avatar} from "antd-mobile";
import './center.css'


const Index = (props) => {
  const [userMessage,setUserMessage] = useState({})
  useEffect(() => {
    getUser().then(res => {
      setUserMessage(res.data.result);
    })
  }, [])
  return (
    <div>
      <div className={style.logo}>
        <div  className={style.avatar} onClick={() => {
          props.history.push('/updateAvatar')
        }}>
          <Avatar src={userMessage.avatarUrl} style={{ '--size': '60px' , '--border-radius': '30px' }}/>
        </div>
        <span className={style.username}>{userMessage.name}</span>
      </div>
    </div>
  );
};

export default withRouter(Index);