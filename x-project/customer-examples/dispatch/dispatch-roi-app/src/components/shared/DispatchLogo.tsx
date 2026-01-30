export default function DispatchLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Use the actual Dispatch logo image - white version for dark background */}
      <img
        src="https://dispatch.me/wp-content/uploads/2024/05/footer-white-logo.png"
        alt="Dispatch"
        className="h-full"
      />
    </div>
  );
}
