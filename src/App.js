import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from './chat';
import Navbar from './components/Navbar';
import ChatBox from './components/ChatBox';

class App extends Component {
  constructor(props) {
    super();
  }
  render() {
    const { feed, sendMessage } = this.props;
    var count = 0;
    return (
      <div>
        <Navbar />
        <ChatBox feed={feed} sendMessage={sendMessage} />
        <input
          className="form-control"
          placeholder="Enter a message"
          type="text"
          onKeyDown={e =>
            e.keyCode === 13 ? sendMessage(e.target.value) : null
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { feed: state };
};

export default connect(
  mapStateToProps,
  {
    sendMessage
  }
)(App);
