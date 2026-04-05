import Hero from "./components/Hero";

function App() {
  return (
    <main className="bg-zinc-950">
      <Hero />

      {/* Spacer to allow scrolling */}
      <section className="h-screen w-full flex items-center justify-center text-zinc-700">
        <h2 className="text-2xl italic tracking-widest">End of Scroll Area</h2>
      </section>
    </main>
  );
}

export default App;
