import Nav from "../components/Nav.js";

// 404 page for links that dont exist
function NoPage() {
  return (
    <>
      <Nav />
      <h1>Error: 404</h1>
      <p>The page you're looking for doesn't seem to exist.</p>
    </>
  )
}

export default NoPage;