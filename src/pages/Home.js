import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";
import Banner from "../images/banner.jpeg";
import axios from 'axios';
import "../styles/HomeStyles.css";

const Home = () => {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/location`);
        setLocationData(response.data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <Layout>
      <div className="home" style={{ backgroundImage: `url(${Banner})` }}>
        <div className="headerContainer">
          <h1 style={{ fontSize: '56px' }}>Epicurean Symphony</h1>
          <p>Best Food WorldWide</p>
          {locationData && (
            <p>
              <a
                href={`${process.env.REACT_APP_GOOGLE_MAPS}?q=${locationData.latitude},${locationData.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: '#001313', 
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Find Us
              </a>
            </p>
          )}
          <Link to="/menu">
            <button>ORDER NOW</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
