import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpotifyProvider, useSpotify } from "./context/SpotifyContext";
import Sidebar from "./components/ui/Sidebar";
import TopBar from "./components/ui/TopBar";
import Player from "./components/ui/Player";
import HomeView from "./components/ui/HomeView";
import SearchView from "./components/ui/SearchView";
import LibraryView from "./components/ui/LibraryView";
import { Toaster } from "./components/ui/sonner";

const MainLayout = () => {
  const { currentView } = useSpotify();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'search':
        return <SearchView />;
      case 'library':
        return <LibraryView />;
      case 'home':
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          {renderCurrentView()}
        </div>
      </div>
      <Player />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <SpotifyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />} />
          </Routes>
        </BrowserRouter>
      </SpotifyProvider>
    </div>
  );
}

export default App;
