import React from "react";
import { Link } from "react-router-dom";

import "styles/404";

const On404 = () => (
  <div className="on404">
    <h1>404 Error - page not found</h1>
    <p>Seems like you strayed away from the path of truth.</p>
    <p>Please press the button below and everything should be fine again.</p>
    <Link to="/">
      <button className="landing__refresh">go to home page</button>
    </Link>
  </div>
);
export default On404;
