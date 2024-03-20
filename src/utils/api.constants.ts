class APIConstants {
  BASE_URL = 'http://localhost:3000/api';

  SNIPPETS = `${this.BASE_URL}/snippets`;

  GET_SNIPPETS = `${this.SNIPPETS}/`;
  SUBMIT_SNIPPET = `${this.SNIPPETS}/`;
}

const API_CONSTANTS = Object.freeze(new APIConstants());
export { API_CONSTANTS };
