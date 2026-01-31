import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from "@dnd-kit/core";
import {
	// arrayMove,
	// SortableContext,
	sortableKeyboardCoordinates,
	// verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { ReactNode } from "react";

interface Props {
	// defaultItems: Array<UniqueIdentifier>;
	children: ReactNode;
}

export function DndSortableProvider({
	// defaultItems,
	children,
}: Props) {
	// const [items, setItems] = useState<Array<UniqueIdentifier>>(defaultItems);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) {
			return;
		}

		if (active.id !== over.id) {
			// setItems((items) => {
			// 	const oldIndex = items.indexOf(active.id);
			// 	const newIndex = items.indexOf(over.id);
			// 	return arrayMove(items, oldIndex, newIndex);
			// });
			console.log(active.id, over.id);
		}
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			{children}
		</DndContext>
	);
}
