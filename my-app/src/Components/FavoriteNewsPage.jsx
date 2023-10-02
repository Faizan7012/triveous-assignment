import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AiOutlineBars } from 'react-icons/ai';
import { BsGrid } from 'react-icons/bs';
import {
  Box,
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
import { NewsCard } from "./News";

const FavoriteNewsPage = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(true);
  const {setSingleNews , user} = useContext(AuthContext)
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async() => {
      try {
       let res = await axios.get(`https://stormy-tights-hen.cyclic.app/favnews/${user._id}`);
       let ans = await res.data;
        setData(ans.data);
      } catch (error) {
          setData([])
      }
   };
    fetchData();
  }, []);

   if(data.length > 0){
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
              tag='Remove From'
              handleData = {setData}
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
              tag='Remove From'
              handleData = {setData}
            />
          ))}
        </Stack>
      )}
    </Box>
    );
   }
   else{
    return <Heading mt='200px' textAlign='center'>
          No Data
    </Heading>
   }
};


export default FavoriteNewsPage;
