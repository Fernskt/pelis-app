import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import MoviesList from '../pages/MoviesList';
import Top100 from '../pages/Top100';
import About from '../pages/About';
import ScrollToTop from '../components/ScrollToTop';

const AppRouter = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/list/:type" element={<MoviesList />} />
        <Route path="/genre/:id" element={<MoviesList />} />
        <Route path="/actor/:actorId" element={<MoviesList />} />
        <Route path="/director/:directorId" element={<MoviesList />} />
        <Route path="/country/:countryCode" element={<MoviesList />} />
        <Route path="/year/:year" element={<MoviesList />} />
        <Route path="/top100" element={<Top100 />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
