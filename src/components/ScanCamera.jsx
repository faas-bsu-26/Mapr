export default function ScanCamera({ image }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Camera viewfinder */}
      <div className="relative w-full max-w-md aspect-3/4 bg-black rounded-lg">
        {/* Image */}
        {image && (
          <img 
            src={image} 
            alt="Camera view" 
            className="w-full h-full object-cover rounded-lg"
          />
        )}
        
        {/* Corner brackets - Top Left */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-white pointer-events-none"></div>
        
        {/* Corner brackets - Top Right */}
        <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-white pointer-events-none"></div>
        
        {/* Corner brackets - Bottom Left */}
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-white pointer-events-none"></div>
        
        {/* Corner brackets - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-white pointer-events-none"></div>
      </div>
    </div>
  );
}
