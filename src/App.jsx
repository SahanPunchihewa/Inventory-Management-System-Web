import AppRoutes from "./routes/app-routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<div className="font-ubuntu">
				<QueryClientProvider client={queryClient}>
					<Toaster position="top-center" reverseOrder={false} />
					<AppRoutes />
					<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
				</QueryClientProvider>
			</div>
		</>
	);
}

export default App;
