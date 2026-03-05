import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error("Route error:", error);

    // React Router sets different shapes for thrown values
    const message = error?.statusText || error?.message || String(error);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
            <p className="mb-2">The application encountered an error while trying to render this page.</p>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm text-red-800">{message}</pre>
        </div>
    );
};

export default ErrorPage;
