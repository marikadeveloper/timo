import Layout from './components/shared/layout/index.tsx';
import './data/db.ts';
import CurrentView from './views/current-view/index.tsx';

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
    <Layout>
      <CurrentView />
      {/* <button onClick={dangerouslyDeleteAllTasks}>Delete all tasks</button> */}
    </Layout>
  );
}

export default App;
