import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return {
        isLoading: false,
        show: action.show,
        error: null,
      };
    }
    case 'FETCH_FAILED': {
      return {
        isLoading: false,
        show: null,
        error: action.error,
      };
    }
    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const { id } = useParams();

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('state', state);

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        setTimeout(() => {
          if (isMounted) {
            dispatch({
              type: 'FETCH_SUCCESS',
              show: result,
            });
          }
        }, 2000);
      })
      .catch(err => {
        if (isMounted) {
          dispatch({
            type: 'FETCH_FAILED',
            error: err.message,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  /* 
    console.log('show', show) ;

    if(isLoading) {
        return <div> Data is being loaded </div>
    }
    if(error) {
        return <div>Error Occured: {error}</div>
    }
 */
  return <div> this is show Page </div>;
};

export default Show;
