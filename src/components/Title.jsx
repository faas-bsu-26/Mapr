import Logo from './Logo';

export default function Title() {
  return (
    <header className="relative w-full py-4 px-6 bg-title-bg">
      <div className="absolute left-6 top-1/2 -translate-y-1/2">
        <Logo />
      </div>
      <h1 className="text-4xl font-bold text-center text-black">
        Mapr
      </h1>
    </header>
  );
}
