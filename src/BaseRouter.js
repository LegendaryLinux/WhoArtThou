import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HeaderBar} from './HeaderBar/HeaderBar';
import {LandingPage} from './LandingPage/LandingPage';
import {ViewSets} from './ViewSets/ViewSets';
import {EditSet} from './EditSet/EditSet';
import {CreateSet} from './CreateSet/CreateSet';
import {UploadSet} from './UploadSet/UploadSet';
import {Play} from './Play/Play';

export const BaseRouter = () => (
  <BrowserRouter>
    <HeaderBar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sets" element={<ViewSets />} />
      <Route path="/sets/:setId" element={<EditSet />} />
      <Route path="/sets/create" element={<CreateSet />} />
      <Route path="/sets/upload" element={<UploadSet />} />
      <Route path="/play" element={<Play />} />
    </Routes>
  </BrowserRouter>
);
