export default function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="bg-button text-white px-6 py-2 rounded hover:brightness-75 active:brightness-50 w-48">
      {text}
    </button>
  );
}
