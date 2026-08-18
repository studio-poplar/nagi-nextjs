import Link from "next/link";
import { navLinks } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div>
          <Link href="/" className="logo">
            凪<small>NAGI</small>
          </Link>
          <p>定額で、日本の渚をめぐる暮らしを。全国の海辺に佇む舟屋一棟一棟を、セカンドホームとして開いています。</p>
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
        <span>© 2026 凪株式会社 NAGI Inc.</span>
        <span>本サイトはWeb制作ポートフォリオのための架空案件です。</span>
      </div>
    </footer>
  );
}
