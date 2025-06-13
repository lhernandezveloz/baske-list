import CardComponent from "./components/CardComponent";
import Link from "next/link";
import Team from "./components/Team";
import styles from "./page.module.css";
function Home() {
  return (
    <>
      <CardComponent
        title="Teams Playing"
        footer={
          <Link
            href="/players"
            className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >
            Go To List
          </Link>
        }
      >
        <div className="d-flex justify-content-around">
          <Team title="Black" />
          <h1>VS</h1>
          <Team title="White" />
        </div>
      </CardComponent>
    </>
  );
}
export default Home;
