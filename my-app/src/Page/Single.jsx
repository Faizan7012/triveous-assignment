import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export default function Single(){
  const { singleNews } = useContext(AuthContext)
    return <Box m='auto' mt='100px' w='90%' fontFamily='sans-serif'>
            <Heading as="h2" fontSize={['20px', '20px','30px','40px']} mt="2" mb='50px' lineHeight="1.3" fontWeight="semibold" color="blue.600" >
          {singleNews?.title}
        </Heading>
             <Image maxW='100%' m='auto' src={singleNews?.image}  mb='30px'/>
             <Text fontWeight={500} fontSize='20px' mb='40px'>{singleNews?.description}</Text>
             <Text >{singleNews?.content}</Text>
             

             <Stack  mt='50px' mb='50px' textAlign='right' color='red'>
                <Text >
                    Posted By {singleNews?.source.name}
                </Text>
                <Text>Publish At {singleNews?.publishedAt}</Text>
             </Stack>
    </Box>
}