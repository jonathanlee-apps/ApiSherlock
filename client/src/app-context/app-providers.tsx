import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import { store } from "store";
import "react-toastify/dist/ReactToastify.css";

// the react-toastify css files needs to be here or in index.tsx (or wherever app is rendered)
// for toastify to work

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => (
  <HelmetProvider>
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      transition={Slide}
    />
    <Provider store={store}>{children}</Provider>
  </HelmetProvider>
);

export default AppProviders;
