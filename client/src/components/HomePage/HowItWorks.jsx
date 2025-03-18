const HowItworks = () => {
    
    return(
        <section className="how-it-works text-center py-5">
            <div className="container">
                <h2 className="mb-4">How It Works</h2>
                <div className="row">
                    <div className="col-md-4">
                        <i className="fas fa-search fa-3x mb-3"></i>
                        <h5>Find Your Car</h5>
                        <p>Search for cars using our advanced filters.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="fas fa-car fa-3x mb-3"></i>
                        <h5>Connect with Sellers</h5>
                        <p>Contact sellers directly through our platform.</p>
                    </div>
                    <div className="col-md-4">
                        <i className="fas fa-handshake fa-3x mb-3"></i>
                        <h5>Make a Deal</h5>
                        <p>Negotiate the price and close the deal with ease.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default HowItworks;