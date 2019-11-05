import {
  LOADING,
  FETCH_TOONS,
  HANDLE_FAVORITE,
  FETCH_EPISODES,
  FETCH_MY_FAVORITES,
} from '../actions/type';

const initialState = {
  santoons: [],
  favorites: [],
  episodes: [],
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_TOONS:
      return {
        ...state,
        santoons: payload.santoons,
        favorites: payload.favorites,
        isLoading: false,
      };

    case FETCH_EPISODES:
      return {
        ...state,
        episodes: payload,
        isLoading: false,
      };

    case HANDLE_FAVORITE:
      return {
        ...state,
        santoons: payload.santoons,
        favorites: payload.favorites,
        isLoading: false,
      };

    case FETCH_MY_FAVORITES:
      return {
        ...state,
        favorites: payload,
        isLoading: false,
      };

    case LOADING:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
