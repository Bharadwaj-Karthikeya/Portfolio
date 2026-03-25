export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 dark:border-white/10 bg-surface-soft py-10 text-center text-sm text-muted">
      <div className="flex w-full flex-col items-center gap-4 px-4 sm:px-8 lg:px-16">
        <p className="text-base font-semibold text-text">
          Bharadwaj Karthikeya
        </p>
        <p className="text-xs">
          Based in Hyderabad, India · pbk311205@gmail.com
        </p>
        <p className="text-xs">
          © 2026 Bharadwaj Karthikeya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
