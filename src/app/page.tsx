import SidePanel from './components/sidepanel';
import HomePage from './pages/HomePage';

export default function Home() {
  return (
      <div className={"flex flex-row mx-auto my-2 w-full justify-between"}>
          <div className={"sideside w-1/6"}>
              <SidePanel/>
          </div>
          <div className={"home flex-1 bg-amber-400 rounded-lg"}>
              <HomePage/>
          </div>
      </div>
  );
}
