import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AiOutlineHeart, AiOutlineBars } from 'react-icons/ai';
import { BsGrid } from 'react-icons/bs';
import {
  Box,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
  Spacer,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import { AuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { NewsCard } from "../Components/News";

const Home = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(true);
  const {setSingleNews , user} = useContext(AuthContext)
  const navigate = useNavigate();

  const fetchData = async() => {
     try {
      let res = await axios.get("https://gnews.io/api/v4/search?q=example&max=50&apikey=66cffdbbd57caad2c955f24d6f118dd0");
      let ans = await res.data;
       setData(ans.articles);
     } catch (error) {
         
         setData([])
     }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box p="4" w='95%' m="auto" mt='100px'>
    <Flex align="center" mb="4">
      <Heading as="h1" size="xl" mr="4">
        Latest News
      </Heading>
      <Spacer />
      <IconButton
        icon={toggle ? <BsGrid /> : <AiOutlineBars />}
        onClick={() => setToggle(!toggle)}
        variant="ghost"
      />
    </Flex>

    {toggle ? (
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="4">
        {data.map((el, index) => (
          <NewsCard
            key={index}
            article={el}
            setSingleNews={setSingleNews}
            navigate={navigate}
            user = {user}
            tag='Add to'
          />
        ))}
      </Grid>
    ) : (
      <Stack spacing="4">
        {data.map((el, index) => (
          <NewsCard
            key={index}
            article={el}
            setSingleNews={setSingleNews}
            navigate={navigate}
            user = {user}
            tag='Add to'

          />
        ))}
      </Stack>
    )}
  </Box>
  );
};


export default Home;
