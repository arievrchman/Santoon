import {
  LOADING_CREATION,
  FETCH_USER_CREATION,
  FETCH_USER_CREATION_EPISODES,
  FETCH_CREATION_PAGES,
} from '../actions/type';

const initialState = {
  myCreations: [],
  myCreationEpisodes: [],
  myCreationPages: [],
  isLoading: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_USER_CREATION:
      return {
        ...state,
        myCreations: payload,
        isLoading: false,
      };

    case FETCH_USER_CREATION_EPISODES:
      return {
        ...state,
        myCreationEpisodes: payload,
        isLoading: false,
      };

    case FETCH_CREATION_PAGES:
      return {
        ...state,
        myCreationPages: payload,
        isLoading: false,
      };

    case 'ADD_USER_PAGE': {
      return {
        ...state,
        myCreationPages: [...state.myCreationPages, payload],
        isLoading: false,
      };
    }

    case 'DELETE_USER_PAGE': {
      return {
        ...state,
        myCreationPages: state.myCreationPages.filter(
          val => val.id !== payload,
        ),
        isLoading: false,
      };
    }

    case LOADING_CREATION:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};
