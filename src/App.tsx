
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Router is now handled in main.tsx */}
      <div>App shell moved to main.tsx</div>
    </QueryClientProvider>
  );
}

export default App;
