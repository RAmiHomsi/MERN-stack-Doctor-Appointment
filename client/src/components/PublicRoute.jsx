import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PublicRoute({ children }) {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  // Delay the redirection by 1 seconds
  setTimeout(() => {
    if (localStorage.getItem("token")) {
      setShouldRedirect(true);
    }
  }, 1000);

  if (shouldRedirect) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
