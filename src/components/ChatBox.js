import React from 'react';

const ChatBox = props => {
  const { feed, sendMessage } = props;
  var count = 0;
  return (
    <div className="chatBox">
      <h1 className="chatBoxHeader">ChatBox</h1>
      <ul>
        {feed.map(entry => {
          return (
            <li className="message" key={count++}>
              {entry.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatBox;
