import { ApiAiClient } from 'api-ai-javascript';
import { applyMiddleware, createStore } from 'redux';

const accessToken = '6e80b0d47e3e47859a6f3375e9795585';
const client = new ApiAiClient({ accessToken });

// REDUX
const ON_MESSAGE = 'ON_MESSAGE';

export const sendMessage = (text, sender = 'user') => ({
  type: ON_MESSAGE,
  payload: {
    text: text,
    sender: sender
  }
});

const messageMiddleware = () => next => action => {
  next(action);

  if (action.type === ON_MESSAGE) {
    const { text } = action.payload;

    client
      .textRequest(text)
      .then(onSuccess)
      .catch(error => {
        console.log('ERROR', error);
      });

    function onSuccess(response) {
      console.log('RESPONSE', response);
      const {
        queryResult: { fulfillmentText }
      } = response;
      next(sendMessage(fulfillmentText, 'bot'));
    }
  }
};

const initState = [
  {
    text: 'It'
  },
  {
    text: 'is'
  },
  {
    text: 'connected.'
  }
];

// Reducer
const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case ON_MESSAGE:
      // Add the action payload to the array
      return [...state, action.payload];
    default:
      return state;
  }
};

export const store = createStore(
  messageReducer,
  applyMiddleware(messageMiddleware)
);
