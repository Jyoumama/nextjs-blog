// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <h2>共通ヘッダー</h2>
      </header>
      <main>{children}</main>
      <footer>
        <p>共通フッター</p>
      </footer>
    </>
  );
}
