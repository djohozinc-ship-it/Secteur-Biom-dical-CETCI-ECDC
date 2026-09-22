import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Members from './pages/Members';
import { BiomedicalIndex, BiomedicalDetail } from './pages/Biomedical';
import { NewsList, NewsDetail } from './pages/News';
import { CommuniqueList, CommuniqueDetail } from './pages/Communiques';
import Resources from './pages/Resources';
import { ProjectList, ProjectDetail } from './pages/Projects';
import Formations from './pages/Formations';
import Opportunities from './pages/Opportunities';
import Directory from './pages/Directory';
import Contact from './pages/Contact';
import SearchPage from './pages/SearchPage';
import { Legal, Privacy, Terms, IntellectualProperty, NotFound } from './pages/Misc';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="a-propos" element={<About />} />
        <Route path="membres" element={<Members />} />
        <Route path="genie-biomedical" element={<BiomedicalIndex />} />
        <Route path="genie-biomedical/:slug" element={<BiomedicalDetail />} />
        <Route path="actualites" element={<NewsList />} />
        <Route path="actualites/:slug" element={<NewsDetail />} />
        <Route path="communiques" element={<CommuniqueList />} />
        <Route path="communiques/:id" element={<CommuniqueDetail />} />
        <Route path="ressources" element={<Resources />} />
        <Route path="projets" element={<ProjectList />} />
        <Route path="projets/:id" element={<ProjectDetail />} />
        <Route path="formations" element={<Formations />} />
        <Route path="opportunites" element={<Opportunities />} />
        <Route path="annuaire" element={<Directory />} />
        <Route path="contact" element={<Contact />} />
        <Route path="recherche" element={<SearchPage />} />
        <Route path="mentions-legales" element={<Legal />} />
        <Route path="confidentialite" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
