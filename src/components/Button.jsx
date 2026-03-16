export default function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="bg-button text-white px-6 py-2 w-48 app-rounded-md app-pressable-brightness app-transition-fast">
      {text}
    </button>
  );
}
