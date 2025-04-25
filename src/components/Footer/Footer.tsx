export default async function Footer() {
  return (
    <footer className="footer border-t border-t-gray-300 py-4">
      <div className="container mx-auto px-4">
        <p>{new Date().getFullYear()} &copy; All rights are reserved</p>
      </div>
    </footer>
  );
}
