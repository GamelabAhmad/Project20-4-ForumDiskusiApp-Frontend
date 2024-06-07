import Navbar from "../organisms/Navbar/index.jsx";
import Footer from "../organisms/Footer/index.jsx";

export default function PagesLayout({ children }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
