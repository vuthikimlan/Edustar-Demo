/* eslint-disable no-duplicate-case */
export const initialState = {
  isLoggedIn: false,
  dataUser: null,
  openBanner: false,
  listBanner: null,
  openVstep: false,
  listVstep: null,
  openAptis: false,
  listAptis: null,
  openIelts: false,
  listIelts: null,
  openAcademicEnglish: false,
  listAcademicEnglish: null,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        isLoggedIn: true,
        dataUser: action.payload,
      };
    }
    case "openBanner": {
      return {
        ...state,
        openBanner: true,
        listBanner: action.payload,
      };
    }
    case "openVstep": {
      return {
        ...state,
        openVstep: true,
        listVstep: action.payload,
      };
    }
    case "openAptis": {
      return {
        ...state,
        openAptis: true,
        listAptis: action.payload,
      };
    }
    case "openIelts": {
      return {
        ...state,
        openIelts: true,
        listIelts: action.payload,
      };
    }
    case "openAcademicEnglish": {
      return {
        ...state,
        openAcademicEnglish: true,
        listAcademicEnglish: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
