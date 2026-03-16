import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';

export default function Title() {
  const navigate = useNavigate();

  return (
    <header className="relative w-full bg-title-bg">
      <div className="py-4 px-6">
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          <Logo />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate('/maplist')}
            className="px-3 py-1 cursor-pointer hover:bg-black/5 active:bg-black/10 app-rounded-lg app-transition-fast app-focus-outline"
            aria-label="Go to home"
          >
            <span className="flex items-end justify-center gap-2">
              <h1 className="text-4xl font-bold text-black text-center leading-none">Mapr</h1>
              <span className="mb-0.5 flex items-center gap-1 text-[11px] font-semibold tracking-[0.12em] text-black/70 uppercase">
                <HomeIcon className="w-3.5 h-3.5" aria-hidden="true" />
                Home
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
