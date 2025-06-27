import CardComponent from "./components/CardComponent";
import Link from "next/link";
import Team from "./components/Team";
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
            Go to player list
          </Link>
        }
      >
        <div className="d-flex justify-content-between">
          <Team title="Black" />
          <h2>VS</h2>
          <Team title="White" />
        </div>
      </CardComponent>
    </>
  );
}
export default Home;
