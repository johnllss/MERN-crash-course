import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { useColorModeValue } from '/src/components/ui/color-mode';

import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import CreatePage from './pages/CreatePage';

const App = () => {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  )
}

export default App;