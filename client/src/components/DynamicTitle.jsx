import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      "/": "Home",
      "/login": "Login",
      "/register": "Register",
      "/catalog": "Catalog",
      "/cars/add": "Add New Car",
      "/profile": "Your Profile",
      "/privacy-policy": "Privacy Policy",
      "/contact": "Contact",
      "/terms-and-conditions": "Terms and Conditions",
    };

    let title = "Page";

    if (routeTitles[location.pathname]) {
      title = routeTitles[location.pathname];
    }

    else if (location.pathname.match(/^\/cars\/edit\/[^/]+$/)) {
      title = "Edit Car";
    } else if (location.pathname.match(/^\/cars\/[^/]+$/)) {
      title = "Car Details";
    }

    else {
      title = "Not Found";
    }

    document.title = `AutoConnect | ${title}`;
  }, [location.pathname]);

  return null;
};

export default DynamicTitle;
