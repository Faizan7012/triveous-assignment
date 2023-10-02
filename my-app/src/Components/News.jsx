import { Box, Button, Heading, IconButton, Image, Text, useToast } from "@chakra-ui/react";
import axios from "axios";

export const NewsCard = ({ article , setSingleNews , navigate , user , tag , handleData}) => {
    const {title, description, publishedAt, image} = article;
    const toast = useToast();
  
     const ReadFullNews = ()=>{
         setSingleNews(article)
         localStorage.setItem('triveousNews' , JSON.stringify(article))
         navigate('/singlenews')
     }
  
    const handleClick=async()=>{
       try {
           let ans = await axios.post('https://stormy-tights-hen.cyclic.app/favnews' , {...article, userId : user._id});
           let res = await ans.data;
           if(res.status){
            toast({
                title: 'Added to Favourite',
                description: '',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
           }
           else{
            toast({
                title: res.message,
                description: '',
                status: 'info',
                duration: 3000,
                isClosable: true,
                position:'top'
              })
           }
       } catch (error) {
        toast({
            title: 'Error Occured',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position:'top'
          })
       }
    }
  
      
    const handleRemove=async()=>{
        try {
            let ans = await axios.delete(`https://stormy-tights-hen.cyclic.app/favnews/${article._id}`);
            let res = await ans.data;
            if(res.status){
                let res1 = await axios.get(`https://stormy-tights-hen.cyclic.app/favnews/${user._id}`);
                let ans1 = await res1.data;
                handleData(ans1.data)
             toast({
                 title: 'Remove from Favourite',
                 description: '',
                 status: 'success',
                 duration: 3000,
                 isClosable: true,
                 position:'top'
               })
            }
            else{
             toast({
                 title: res.message,
                 description: '',
                 status: 'info',
                 duration: 3000,
                 isClosable: true,
                 position:'top'
               })
            }
        } catch (error) {
         toast({
             title: 'Error Occured',
             description: error.message,
             status: 'error',
             duration: 3000,
             isClosable: true,
             position:'top'
           })
        }
     }
  
    return (
      <Box
        borderWidth="1px"
        borderRadius="md"
        overflow="hidden"
        boxShadow="md"
        bg="white"
        p="4"
        transition="transform 0.2s"
        _hover={{ transform: 'translateY(-4px)' }}
      >
        <Image src={image} alt={title} h="200px" maxW='100%' objectFit="cover" borderRadius="md" mb="4" />
        <Text color="gray.500" fontSize="sm" fontWeight="medium">{publishedAt}</Text>
        <Heading as="h2" size="md" mt="2" lineHeight="1.3" fontWeight="semibold" color="blue.600" noOfLines={2}>
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.600" noOfLines={3}>
          {description}
        </Text>
        <Button as="a"  onClick={ReadFullNews} colorScheme="blue" size="sm" mt="4">
          Read More
        </Button>
        <Button  onClick={tag=='Add to' ? handleClick : handleRemove} colorScheme="blue" size="sm" mt="4" ml='10px'>
          {tag} Favourite
        </Button>
      </Box>
    );
  };