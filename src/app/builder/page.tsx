import { FormBuilderCanvas } from "@/components/canvas";
import { Sidebar } from "@/components/sidebar";

export default function BuilderPage() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r border-black/5">
        <Sidebar/>
      </aside>  
      <main className="flex-1 overflow-auto">
        <FormBuilderCanvas />
      </main>
    </div>
  );
}
