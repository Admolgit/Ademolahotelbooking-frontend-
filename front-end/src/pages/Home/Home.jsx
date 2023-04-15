import Featured from "../../components/Featureds/FeaturedHotels";
import FeaturedProperties from "../../components/PropertyFeatures/PropertiesFeatured";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
// import MailList from "../Lists/MailList";
import Navbar from "../../components/Navbar/Navbar";
import PropertyList from "../../components/ListOfProperties/PropertiesList";
import classes from "./Home.module.css"

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className={classes.homeContainer}>
        <Featured/>
        <h1 className={classes.homeTitle}>Browse by property type</h1>
        <PropertyList/>
        <h1 className={classes.homeTitle}>Homes guests love</h1>
        <FeaturedProperties/>
        {/* <MailList/> */}
        <Footer/>
      </div>
    </div>
  );
};

export default Home;