import "./globals.css";
import NavbarEstigia from "../components/NavbarEstigia";
import FooterEstigia from "../components/FooterEstigia";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <NavbarEstigia />
        {children}
        <FooterEstigia />
      </body>
    </html>
  );
}