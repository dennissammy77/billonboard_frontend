import { Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, HStack, Heading, Icon, Image, Text } from "@chakra-ui/react"
import { dashboardContext } from "@/components/providers/dashboard.context"
import { useContext, useEffect, useState } from "react"
import { FaChalkboardUser } from "react-icons/fa6";
import { BsFillPinMapFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

export const ViewBoard=()=>{
    const {board_data,set_page} = useContext(dashboardContext);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slidesCount = board_data?.advertisement_data?.length;

    const SLIDES_INTERVAL_TIME = 5000;
    const ANIMATION_DIRECTION = "right";
    const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    useEffect(() => {
        const automatedSlide = setInterval(() => {
            ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
        }, SLIDES_INTERVAL_TIME);
        return () => clearInterval(automatedSlide);
    }, [slidesCount]);

    const carouselStyle = {
        transition: "all 1.5s",
        ml: `-${currentSlide * 100}%`,
      };
    return(
        <Flex flexDirection={''} gap='2'>
            <Flex pos="relative" overflow="hidden" w='' bg='blue' h='full' p='2'>
                <Flex h='full' w='full' {...carouselStyle}>
                    {board_data?.advertisement_data.map((data, data_id)=>{
                        return(
                            <Image src={data.image_url} alt="board image" boxSize={'full'} backgroundSize="cover" objectFit={'cover'} borderRadius={5}/>
                        )
                    })}
                </Flex>
            </Flex>
            <Box>
                <Box bg='#fff' w='full' p='4'>
                    <Heading as={'h3'}>{board_data?.name_of_billboard}</Heading>
                    <HStack mt='2'>
                        <Icon boxSize={4} as={FaChalkboardUser}/>
                        <Text>{board_data?.ad_agency_name}</Text>
                    </HStack>
                    <HStack mt='2'>
                        <Icon boxSize={4} as={BsFillPinMapFill}/>
                        <Text>{board_data?.location}</Text>
                    </HStack>
                    <HStack color='#3874ff' mt='2'>
                        <Icon boxSize={4} as={FaStar}/>
                        <Badge bgColor={'#3874ff'} color={'#fff'}>{board_data?.bob_rating}/5</Badge>
                    </HStack>
                    <Text>Sides: {board_data?.number_of_sides}</Text>
                    <Text>Description</Text>
                    <Text>{board_data?.description}</Text>
                    <Text>Description</Text>
                    <Text>{board_data?.description}</Text>

                </Box>
                <Flex pos="relative" overflow="hidden" w='' bg='blue' h='full'  mt='2' p='2'>
                    <Flex h='full' w='full' {...carouselStyle}>
                        {board_data?.advertisement_data.map((data, data_id)=>{
                            return(
                                <Image src={data.image_url} alt="board image" boxSize={'full'} backgroundSize="cover" objectFit={'cover'} borderRadius={5}/>
                            )
                        })}
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}

{/* <Flex h='full' w='60%' position={'relative'} overflow="hidden" {...carouselStyle}>
{board_data?.advertisement_data.map((data, data_id)=>{
    return(
        <Image src={data.image_url} alt="board image" boxSize="full" backgroundSize="cover" borderRadius={5}/>
    )
})}
</Flex> */}