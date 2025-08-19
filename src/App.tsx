import Modal from "./components/Modal";
import StackedList from "./components/StackedList";

function App() {
  return (
    <section className="w-full h-screen bg-gray-900 ">
      <div className="max-w-7xl mx-auto">
        <StackedList />
        <Modal />
      </div>
    </section>
  );
}

export default App;
