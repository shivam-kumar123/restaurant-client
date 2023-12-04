import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { Box, Typography, Paper, Card, CardContent, Grid, Rating } from "@mui/material";
import axios from 'axios';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/about`);
        setAboutData(response.data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchAbout();
  }, []);

  return (
    <Layout>
      {aboutData && (
        <Box
          sx={{
            my: 5,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome To Epicurean Symphony
          </Typography>

          {/* Display Chef Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Meet Our Chef
            </Typography>
            <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
              {aboutData.chef.bio}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Signature Dish: {aboutData.chef.signature_dish}
            </Typography>
          </Paper>

          {/* Display Awards Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Awards
            </Typography>
            <Grid container spacing={2}>
              {aboutData.awards.map((award, index) => (
                <Grid item key={index} xs={12} sm={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {award.organization}
                      </Typography>
                      <Typography variant="subtitle2">
                        {award.year} - {award.award}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Display Ambiance Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Ambiance
            </Typography>
            <Typography variant="body1">{aboutData.ambiance.description}</Typography>
          </Paper>

          {/* Display Sustainability Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Sustainability Initiatives
            </Typography>
            <Grid container spacing={2}>
              {aboutData.sustainability.initiatives.map((initiative, index) => (
                <Grid item key={index} xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {initiative.name}
                      </Typography>
                      <Typography variant="body2">{initiative.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Display Events Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Upcoming Events
            </Typography>
            <Grid container spacing={2}>
              {aboutData.events.upcoming_events.map((event, index) => (
                <Grid item key={index} xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {event.name}
                      </Typography>
                      <Typography variant="subtitle2">{event.date}</Typography>
                      <Typography variant="body2">{event.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Display Reviews Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Customer Reviews
            </Typography>
            {aboutData.reviews.map((review, index) => (
              <Box key={index} sx={{ my: 2 }}>
                <Typography variant="subtitle1">{review.customer_name}</Typography>
                <Rating name={`rating-${index}`} value={review.rating} readOnly precision={0.5} />
                <Typography variant="body2">{review.comment}</Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      )}
    </Layout>
  );
};

export default About;
