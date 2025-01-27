import React from 'react';
import Header from '../components/Header';
import Timer from '../components/Timer';
import TaskList from '../components/TaskList';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Timer />
        <TaskList />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
