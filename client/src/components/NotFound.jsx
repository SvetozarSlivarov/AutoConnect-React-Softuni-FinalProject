import React from "react";
import { Link } from "react-router-dom";
import '../assets/styles/NotFound.css'

const NotFound = () => {
    return (
        <div id="notfound">
		<div className="notfound">
			<div className="notfound-404"></div>
			<h1>404</h1>
			<h2>Oops! Page Not Be Found</h2>
			<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
			<Link to='/'>
            Back to homepage
            </Link>
		</div>
	</div>
    );
};






// const NotFound = () => {
//   return (
//     <div className="container text-center mt-5">
//       <h1 className="display-1 text-danger">404</h1>
//       <h2 className="mb-4">Page Not Found</h2>
//       <p className="lead">The page you are looking for does not exist.</p>
//       <Link to="/" className="btn btn-primary mt-3">
//         Go Back Home
//       </Link>
//     </div>
//   );
// };

export default NotFound;
