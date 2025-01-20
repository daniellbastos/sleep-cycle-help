import { SleepCalculator } from "@/components/SleepCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-sleep-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-sleep-primary mb-8 text-center">
          Sleep Cycle Calculator
        </h1>
        <SleepCalculator />
      </div>
    </div>
  );
};

export default Index;