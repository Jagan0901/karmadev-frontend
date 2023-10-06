import { NavBar } from "../Components/NavBar";

export function Home() {
  const styles = {
    fontSize: "40px",
  };

  const titleStyles = {
    marginTop: "15%",
  };
  return (
    <>
      <NavBar />
      <div style={titleStyles}>
        <h2 style={styles}>Welcome to e-commerce app</h2>
      </div>
    </>
  );
}
