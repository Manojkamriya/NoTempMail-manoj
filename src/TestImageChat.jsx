import React from "react";
import "./TestImageChat.css";

export default function TestImageChat() {
  return (
    <div className="test-image-container">
      <div className="test-image-message right">
        <div className="test-image-avatar">
          <img src="https://via.placeholder.com/40" alt="User" />
        </div>
        <div className="test-image-bubble light">
          <span className="test-image-mention">@Mark</span> Their decision is very important
        </div>
      </div>

      <div className="test-image-message left">
        <div className="test-image-avatar">
          <img src="https://via.placeholder.com/40" alt="User" />
        </div>
        <div className="test-image-bubble dark">
          <span className="test-image-mention">@Joahn</span> Have they signed their contract yet?
        </div>
      </div>

      <div className="test-image-input">
        <input type="text" placeholder="Type a message..." />
        <button>&#9658;</button>
      </div>
    </div>
  );
}
