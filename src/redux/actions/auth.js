import {
  AUTH_LOADING,
  AUTH_ERROR,
  LOGGED_IN,
  LOGGED_OUT,
  UPDATE_USER,
} from '../constant/auth';
import axios from '../../helpers/axios';

export const login = data => dispatch => {
  dispatch({
    type: LOGGED_IN,
    payload: data,
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGGED_OUT,
  });
};

export const updateUser = (id, token, data) => dispatch => {
  dispatch({
    type: AUTH_LOADING,
  });

  axios({
    method: 'PUT',
    url: `/user/${id}/profile`,
    data,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(({data}) => {
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        error: err.response,
      });
    });
};
