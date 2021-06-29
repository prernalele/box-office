import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    let isMounted = false  
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        setTimeout(()=> {
            if(isMounted) {
                setShow(result);
                setIsLoading(false);
            }
        }, 2000)

      })
      .catch(err => {
          if(isMounted) {
            setError(err.message);
            setIsLoading(false)
          }
        })

    return ()=> {
        isMounted = false
    }
    },[id]);

    if(isLoading) {
        return <div> Data is being loaded </div>
    }
    if(error) {
        return <div>Error Occured: {error}</div>
    }

    return <div> this is show Page </div>
};

export default Show;
