import {
  LOADING,
  FETCH_TOONS,
  FETCH_EPISODES,
  FETCH_MY_FAVORITES,
  HANDLE_FAVORITE,
} from './type';
import axios from '../../helpers/axios';

export const findAllToons = token => dispatch => {
  dispatch({
    type: LOADING,
  });

  axios({
    method: 'GET',
    url: '/santoons',
    headers: {
      Authorization: token,
    },
  })
    .then(({data}) => {
      const favorites = data.filter(item => item.isFavorite);
      dispatch({
        type: FETCH_TOONS,
        payload: {
          santoons: data,
          favorites,
        },
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const findToonEpisodes = id => dispatch => {
  dispatch({
    type: LOADING,
  });
  axios({
    method: 'GET',
    url: `/santoons/${id}/episodes`,
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_EPISODES,
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const findMyFavorites = token => dispatch => {
  dispatch({
    type: LOADING,
  });

  axios({
    method: 'GET',
    url: `/santoons?is_favorite=true`,
    headers: {
      Authorization: token,
    },
  })
    .then(({data}) => {
      dispatch({
        type: FETCH_MY_FAVORITES,
        payload: data,
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const handleFavorite = (id, request, token) => dispatch => {
  axios({
    method: request,
    url: `/user/${id}/favorite`,
    headers: {
      Authorization: token,
    },
  })
    .then(({data}) => {
      const favorites = data.filter(item => item.isFavorite);
      dispatch({
        type: HANDLE_FAVORITE,
        payload: {
          santoons: data,
          favorites,
        },
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};
