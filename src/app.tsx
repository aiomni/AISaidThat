import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import { SiteShell } from "@/components/layout/site-shell";
import { ContributePage } from "@/pages/contribute-page";
import { HomePage } from "@/pages/home-page";
import { ModelPage } from "@/pages/model-page";
import { ModelsPage } from "@/pages/models-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { PhrasePage } from "@/pages/phrase-page";

export function App() {
  return (
    <HashRouter>
      <SiteShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/models/:slug" element={<ModelPage />} />
          <Route path="/phrases/:slug" element={<PhrasePage />} />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SiteShell>
    </HashRouter>
  );
}

