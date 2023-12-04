import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from 'axios';
import chhola from '../images/chhola.jpg';

const Menu = () => {
  const [menuList, setmenuList] = useState({ categories: [], seasonal_menu: { items: [] } });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = () => {
    return menuList.categories.reduce((filteredCategories, category) => {
      const filteredItems = category.items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredItems.length > 0) {
        filteredCategories.push({
          ...category,
          items: filteredItems,
        });
      }

      return filteredCategories;
    }, []);
  };

  const filteredSeasonalItems = menuList.seasonal_menu.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/menu`);
        setmenuList(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenuList();
  }, []);

  return (
    <Layout>
      <div>
        <input
          type="text"
          placeholder="Search for a food item..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ margin: '20px', padding: '5px' }}
        />
      </div>

      {filteredItems().map(category => (
        <div key={category.name}>
          {category.items.length > 0 ? (
            <>
              <h3 style={{ marginLeft: '30px' }}>{category.name}</h3>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {category.items.map(item => (
                  <Card key={item.name} sx={{ maxWidth: "300px", m: 4 }}>
                    <CardActionArea>
                      <CardMedia
                        sx={{ minHeight: "200px" }}
                        component={"img"}
                        src={item.image || chhola}
                        alt={item.name}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom component={"div"}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2">{item.description}</Typography>
                        <Typography variant="body2">Price: ${item.price}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
            </>
          ) : null}
        </div>
      ))}

      {filteredSeasonalItems.length > 0 && (
        <>
          <h2 style={{ marginLeft: '30px' }}>Seasonal Menu:</h2>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {filteredSeasonalItems.map(item => (
              <Card key={item.name} sx={{ maxWidth: "300px", m: 4 }}>
                <CardActionArea>
                  <CardMedia
                    sx={{ minHeight: "200px" }}
                    component={"img"}
                    src={item.image || chhola}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom component={"div"}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2">{item.description}</Typography>
                    <Typography variant="body2">Price: ${item.price}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Layout>
  );
};

export default Menu;
