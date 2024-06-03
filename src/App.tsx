import Flowchart from "./components/Flowchart";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Flowchart Diagram</h1>
      </header>
      <main>
        <Flowchart />
      </main>
    </div>
  );
};

export default App;
