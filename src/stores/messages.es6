import Reflux from 'reflux';
import Actions from '../actions';

const messages = [
  'Hello, Lumpen Radio!',
  'How do I WLPN?',
  'Listen now.',
  'Stop poking me!',
  'I can haz musik?!'
];

let Messages = Reflux.createStore({
  listenables: [Actions],

  init() {
    // Set the default message
    this.message = messages[0];
  },

  onUpdateMessage() {
    while(true) {
      let newMessage = messages[Math.floor(Math.random() * messages.length)];

      if (newMessage !== this.message) {
        this.message = newMessage;
        break;
      }
    }

    this.trigger(this.message);
  }
});

export default Messages;
