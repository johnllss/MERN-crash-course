import { Box } from '@chakra-ui/react';
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    >
    </Box>
  );
}

export default ProductCard;