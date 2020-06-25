export interface ActiveBreed {
  data: any[];
  cat_id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
}

export interface Breed {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
}

export interface CatInterface {
  id: string;
  url: string;
  breeds: Breed[];
  height: number;
  width: number;
}

export interface Paging {
  page: number;
  limit: number;
  breed_id: string;
}

export interface CatState {
  loading: {
    page: false;
    breeds: false;
  };
  breeds: any[];
  activeBreed: ActiveBreed;
  paging: Paging;
  cat: CatInterface;
}

const initialState: CatState = {
  loading: {
    page: false,
    breeds: false,
  },
  breeds: [],
  activeBreed: {
    cat_id: '',
    name: '',
    origin: '',
    temperament: '',
    description: '',
    data: [],
  },
  paging: {
    page: 1,
    limit: 10,
    breed_id: '',
  },
  cat: {
    id: '',
    url: '',
    breeds: [],
    height: 0,
    width: 0,
  },
};

const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.type]: action.payload.value,
        },
      };
    case 'SET_BREEDS':
      return { ...state, breeds: [...action.payload] };
    case 'SET_ACTIVE_BREED':
      return {
        ...state,
        activeBreed: {
          ...state.activeBreed,
          ...action.payload,
        },
      };
    case 'SET_CAT':
      return {
        ...state,
        cat: { ...action.payload },
      };
    case 'SET_PAGING':
      return {
        ...state,
        paging: { ...action.payload },
      };
    default:
      return { ...state };
  }
};

export default reducer;
