import React from 'react';
import { Stack, Button, Flex } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = 5; // Adjust this number as needed

  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = range(startPage, endPage);

  return (
    <Flex justify="flex-start" mt={4}>
      <Stack direction="row" spacing={2}>
        {pages.map((page) => (
          <Button
            key={page}
            colorScheme={currentPage === page ? 'blue' : 'gray'}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </Stack>
    </Flex>
  );
};

export default Pagination;
