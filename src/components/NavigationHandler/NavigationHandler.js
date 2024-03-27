import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavigationHandler({ isSignedUp, isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedUp) {
      navigate("/signup");
    } else if (!isLoggedIn) {
      navigate("/login");
    }
    // The dependency array includes values that, when changed, will re-trigger the effects
  }, [isSignedUp, isLoggedIn, navigate]);

  // This component does not render anything
  return null;
}

export default NavigationHandler;