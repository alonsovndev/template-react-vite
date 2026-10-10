import { StatusCard } from "@/features/status";
import { PageHeader } from "@/shared/components/PageHeader";

export default function HomePage() {
  return (
    <>
      <PageHeader title="Welcome" subtitle="Backend connectivity at a glance" />
      <StatusCard />
    </>
  );
}
