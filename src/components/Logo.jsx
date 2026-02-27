import logo from '../assets/logo.png';

export default function Logo() {
  return (
    <div className="rounded-full overflow-hidden w-12 h-12">
      <img 
        src={logo} 
        alt="Logo" 
        className="w-full h-full object-cover"
      />
    </div>
  );
}
