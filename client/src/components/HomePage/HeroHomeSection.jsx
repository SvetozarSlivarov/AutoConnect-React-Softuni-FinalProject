import '../../../public/styles/HomeHeroSection.css'

const HeroHomeSection = () => {
    return (
        <header className="hero-section">
            <div className="content">
                <h1>Welcome to AutoCONNECT</h1>
                <p className="lead">Connecting Buyers and Sellers to Drive Deals Forward!</p>
                <a href="/catalog" className="btn btn-light btn-lg btn-browse">Browse Cars</a>
                <a href="#" className="btn btn-light btn-lg btn-sell">Sell Car</a>
            </div>
        </header>
    )
}
export default HeroHomeSection;