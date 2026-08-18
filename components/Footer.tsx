import Link from "next/link";
import { getSiteData } from "@/lib/content";

export default function Footer() {
  const { navLinks, footer } = getSiteData();

  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div>
          <Link href="/" className="logo">
            凪<small>NAGI</small>
          </Link>
          <p>{footer.tagline}</p>
        </div>
        <div className="footer-col">
          <h5>SITE</h5>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/apply">入会案内</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>SUPPORT</h5>
          <ul>
            <li>
              <a href="#">よくある質問</a>
            </li>
            <li>
              <a href="#">利用規約</a>
            </li>
            <li>
              <a href="#">プライバシーポリシー</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>FOLLOW</h5>
          <ul>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">note</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>{footer.copyright}</span>
        <span>{footer.disclaimer}</span>
      </div>
    </footer>
  );
}
