import { Link } from "react-router-dom";
import React from "react";

export function GoBackButton() {
  return (
    <Link className={"btn btn-secondary mb-3"} to={"/dashboard"}>
      Go Back
    </Link>
  );
}
