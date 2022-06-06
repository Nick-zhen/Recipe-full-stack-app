import './App.css';
import RecipeBody from './components/RecipeBody';
import TimeAndDate from './components/TimeAndDate';
function App() {
  return (
        <div className="body-div">
          <TimeAndDate />
          <RecipeBody />
        </div>
  );
}

export default App;
