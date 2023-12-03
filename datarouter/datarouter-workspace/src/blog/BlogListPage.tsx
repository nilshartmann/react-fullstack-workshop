// Typesafety of loader functions: https://github.com/remix-run/remix/blob/40a4d7d5e25eb5edc9a622278ab111d881c7c155/decisions/0003-infer-types-for-useloaderdata-and-useactiondata-from-loader-and-action-via-generics.md
import { LoaderFunction } from "react-router-dom";

const blogListPageLoader: LoaderFunction = async () => {};

export default function BlogListPage() {
  // - blogListPageLoader implementieren
  // - blogListPageLoader als Loader-Funktion fuer die Route "/blog" registrieren
  // - Daten hier verwenden um die Liste der <PostTeaser>-Komponenten zu rendern
  return (
    <div className={"space-y-4"}>
      <h1>Nicht implementiert 😢</h1>
      {/* Zeige jeden gelesenen Blog-Teaser mit <PostTeaser /> an */}
    </div>
  );
}
