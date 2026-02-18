export default function Footer() {
  return (
    <footer className="no-print mt-12 border-t border-paraspect-sky/30 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-paraspect-ink/75">
        Crafted for children with imagination ✨ · © {new Date().getFullYear()} Paraspect
      </div>
    </footer>
  );
}
