import React from "react";

import lobby from "../assets/image/lobby.png";
const Lobby = () => {
  return (
    <section>
      <img
        src={lobby}
        alt="로비 이미지"
        width="100%"
        style={{
          verticalAlign: "sub",
        }}
      />
    </section>
  );
};

export default Lobby;
