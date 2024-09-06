import './App.scss';
import './data/db';

function App() {
  // const changeColorOnClick = async () => {
  //   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //   chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     func: () => {
  //       document.body.style.backgroundColor = 'green';
  //     },
  //   });
  // };
  return (
    <>
      <h1>Hello there!</h1>
    </>
  );
}

export default App;
