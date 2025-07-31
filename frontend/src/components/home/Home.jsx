import React from 'react';
import './Home.css';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <Navigation />
      <main className="main-content">
        <header className="hero-section">
          <h1>Welcome to Game Leaderboard</h1>
          <div className="hero-content">
            <p>Track scores and stay on top of your favorite games!</p>
            <p>Manage players, update points, and view live leaderboards for games like Tic Tac Toe, Rock Paper Scissors, and more.</p>
          </div>
        </header>

        <section className="features-section">
          <div className="feature-card">
            <h3>🎮 Track Game Scores</h3>
            <p>Easily add players and manage scores for your favorite simple games. Stay competitive and organized.</p>
          </div>
          <div className="feature-card">
            <h3>📈 Live Leaderboard</h3>
            <p>Get real-time updates on who's leading. Rankings are automatically updated as you score.</p>
          </div>
          <div className="feature-card">
            <h3>🕹️ Multiple Games Support</h3>
            <p>Switch between different games and maintain separate leaderboards for each. All your games in one place!</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
