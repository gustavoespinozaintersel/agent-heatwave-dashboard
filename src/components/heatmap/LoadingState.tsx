
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const LoadingState = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loading heatmap data...</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading data...</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
