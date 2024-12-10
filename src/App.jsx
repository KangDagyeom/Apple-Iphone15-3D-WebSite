import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Model from './components/Model';

import * as Sentry from '@sentry/react';

const App = () => {
  return <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>;
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
     
    </main>
  )
}

export default Sentry.withProfiler(App);