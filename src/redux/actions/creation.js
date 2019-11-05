import {
  LOADING_CREATION,
  FETCH_USER_CREATION,
  FETCH_USER_CREATION_EPISODES,
  FETCH_CREATION_PAGES,
} from './type';
import axios from '../../helpers/axios';

export const findMyCreations = (userId, token) => dispatch => {
  dispatch({
    type: LOADING_CREATION,
  });

  axios({
    method: 'GET',
    url: `/user/${userId}/santoons`,
    headers: {
      Authorization: token,
    },
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_USER_CREATION,
        payload: data,
      });
    })
    .catch(err => console.log(err.response));
};

export const findMyCreationEpisodes = (userId, toonId, token) => dispatch => {
  dispatch({
    type: LOADING_CREATION,
  });

  axios({
    method: 'GET',
    url: `/user/${userId}/santoon/${toonId}/episodes`,
    headers: {
      Authorization: token,
    },
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_USER_CREATION_EPISODES,
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const findCreationPages = credentials => dispatch => {
  const {token, userId, episodeId, toonId} = credentials;
  dispatch({
    type: LOADING_CREATION,
  });

  axios({
    method: 'GET',
    url: `/user/${userId}/santoon/${toonId}/episode/${episodeId}/images`,
    headers: {
      Authorization: token,
    },
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_CREATION_PAGES,
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const addEpisodePage = (credentials, data) => dispatch => {
  const {userId, toonId, episodeId, token} = credentials;
  dispatch({
    type: LOADING_CREATION,
  });
  axios({
    method: 'POST',
    url: `/user/${userId}/santoon/${toonId}/episode/${episodeId}/image`,
    data,
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(({data}) => {
      dispatch({
        type: 'ADD_USER_PAGE',
        payload: data.data,
      });
    })
    .catch(err => {
      console.log(err.response, '=>');
    });
};

export const removePage = credentials => dispatch => {
  const {token, userId, episodeId, toonId, pageId} = credentials;
  dispatch({
    type: LOADING_CREATION,
  });

  axios({
    method: 'DELETE',
    url: `/user/${userId}/santoon/${toonId}/episode/${episodeId}/image/${pageId}`,
    headers: {
      Authorization: token,
    },
  })
    .then(({data}) => {
      console.log(typeof +data.id);
      dispatch({
        type: 'DELETE_USER_PAGE',
        payload: pageId,
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};
