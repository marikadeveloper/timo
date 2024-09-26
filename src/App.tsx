import Layout from './components/shared/layout/index.tsx';
import './data/db.ts';
import db from './data/db.ts';
import CurrentView from './views/current-view/index.tsx';

console.log('tasks', await db.tasks.toArray());
console.log('projects', await db.projects.toArray());

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
    </Layout>
  );
}

export default App;
