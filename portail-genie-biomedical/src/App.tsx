import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Members = lazy(() => import('./pages/Members'));
const BiomedicalIndex = lazy(() => import('./pages/Biomedical').then((m) => ({ default: m.BiomedicalIndex })));
const BiomedicalDetail = lazy(() => import('./pages/Biomedical').then((m) => ({ default: m.BiomedicalDetail })));
const NewsList = lazy(() => import('./pages/News').then((m) => ({ default: m.NewsList })));
const NewsDetail = lazy(() => import('./pages/News').then((m) => ({ default: m.NewsDetail })));
const CommuniqueList = lazy(() => import('./pages/Communiques').then((m) => ({ default: m.CommuniqueList })));
const CommuniqueDetail = lazy(() => import('./pages/Communiques').then((m) => ({ default: m.CommuniqueDetail })));
const Resources = lazy(() => import('./pages/Resources'));
const ProjectList = lazy(() => import('./pages/Projects').then((m) => ({ default: m.ProjectList })));
const ProjectDetail = lazy(() => import('./pages/Projects').then((m) => ({ default: m.ProjectDetail })));
const Formations = lazy(() => import('./pages/Formations'));
const Opportunities = lazy(() => import('./pages/Opportunities'));
const Directory = lazy(() => import('./pages/Directory'));
const Contact = lazy(() => import('./pages/Contact'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const Legal = lazy(() => import('./pages/Misc').then((m) => ({ default: m.Legal })));
const Privacy = lazy(() => import('./pages/Misc').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Misc').then((m) => ({ default: m.Terms })));
const IntellectualProperty = lazy(() => import('./pages/Misc').then((m) => ({ default: m.IntellectualProperty })));
const NotFound = lazy(() => import('./pages/Misc').then((m) => ({ default: m.NotFound })));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="a-propos" element={<About />} />
        <Route path="membres" element={<Members />} />
        <Route path="membres/:id" element={<Members />} />
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
        <Route path="conditions-utilisation" element={<Terms />} />
        <Route path="propriete-intellectuelle" element={<IntellectualProperty />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
