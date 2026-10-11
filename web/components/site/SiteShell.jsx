import "../../app/marketing.css";
import Header from "./Header";
import Footer from "./Footer";

/** Wraps every marketing page: scoped .mkt theme + header + footer. */
export default function SiteShell({ children }) {
  return (
    <div className="mkt">
      <a href="#main" className="skip">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
