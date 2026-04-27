import { Box, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useColorModeValue } from './ui/color-mode';
import { useProductStore } from '@/store/product';
import { toaster } from '@/components/ui/toaster';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const {deleteProduct} = useProductStore();
  const handleDeleteProduct = async (pid) => {
    const {success, message} = await deleteProduct(pid);

    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        closable: true,
        duration: 3000
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        closable: true,
        duration: 3000
      });
    }
  }

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton aria-label='Edit Product'>
            <FaRegEdit color='blue'/>
          </IconButton>
          <IconButton aria-label='Delete Product' onClick={() => handleDeleteProduct(product._id)}>
            <MdDeleteForever color='red'/>
          </IconButton>
        </HStack>
      </Box>

    </Box>
  );
}

export default ProductCard;