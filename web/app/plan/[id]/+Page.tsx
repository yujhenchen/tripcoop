import { SidebarProvider } from "@/components/providers/SidebarProvider";
import { Content } from "./content";
import { PlanSidebar } from "./planSidebar";
import { DndSortableProvider } from "@/components/providers/DndSortableProvider";

export default function PlanPage() {
	return (
		<DndSortableProvider>
			<div className="flex flex-col md:flex-row-reverse h-[calc(100vh-6rem)]">
				<Content />
				<SidebarProvider>
					<PlanSidebar />
				</SidebarProvider>
			</div>
		</DndSortableProvider>
	);
}
