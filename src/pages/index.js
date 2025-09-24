import { useEffect } from "react";
import { useHistory } from "@docusaurus/router";

export default function Home() {
  const history = useHistory();
  
  useEffect(() => {
    // Redirect to the first page in User Docs
    history.replace("/docs/OctoVault-Stellar/welcome-to-untangled");
  }, [history]);

  return null; // Return null since we're redirecting immediately
}
