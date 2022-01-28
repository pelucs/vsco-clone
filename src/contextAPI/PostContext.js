import React, { useState, useEffect } from 'react';
import { database } from '../Firebase';

export const PostContext = React.createContext();

export const PostContextProvider = props => {

  const [ post, setPost ] = useState([]);

  useEffect(() => {
    database.collection("posts").orderBy("timestamp", "desc").onSnapshot(snap => {
      setPost(snap.docs.map(doc => {
        return {
          id: doc.id,
          data: doc.data()
        }
      }))
    })
  }, []);

  return(
    <PostContext.Provider value={{ post, setPost }}>
      {props.children}
    </PostContext.Provider>
  )
}