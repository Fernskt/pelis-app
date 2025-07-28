import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import MoviesList from '../pages/MoviesList';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/list/:type" element={<MoviesList />} />
        <Route path="/genre/:id" element={<MoviesList />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
