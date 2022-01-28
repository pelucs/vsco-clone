import './AppVS.css';
import { useState, useContext, useEffect } from 'react';
import { PostContext } from './../../contextAPI/PostContext';
import { database } from '../../Firebase';

import Header from '../../components/headerApp/HeaderApp';
import Footer from '../../components/footer/Footer';


export default () => {

  const { post, setPost } = useContext(PostContext);

  return(
    <div>
      <Header/>
      <div className="app-container">
        <h1>VSCO - Feed</h1>
        {
          post.length != 0 ?
            <div className="feed-box">
              {
                post.map(val => {
                  return (
                    <div className="post-box" id={val.id}>
                    <img src={val.data.image} alt="Post"/>
                    <div className="info-post">
                      <div className="name-desc">
                        <h1>{val.data.userName}</h1>
                        <p>{val.data.descricao}</p>
                      </div>
                    </div>
                  </div>
                  )
                })
              }
            </div>
          :
            <div className="aviso-feed">
              <h1>Seja o primeiro a postar... :)</h1>
            </div>
        }

      </div>
      <Footer/>
    </div>
  )
}