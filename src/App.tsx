import Header from "./components/Header";
import Modal from "./components/Modal";
import StackedList from "./components/StackedList";

function App() {
  return (
    <section className="w-full h-screen">
      <Header />
      <StackedList />
      <Modal />
    </section>
  );
}

export default App;
