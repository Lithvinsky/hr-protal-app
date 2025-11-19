import { useRouteError } from "react-router-dom";
import Navigation from "../components/Navigation";

import PageContent from "../components/PageContent";
import Footer from "../components/Footer";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-between">
      <div>
        <Navigation />
        <main className="container flex-grow mt-4">
          <PageContent title={title}>
            <p>{message}</p>
          </PageContent>
        </main>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

export default ErrorPage;
