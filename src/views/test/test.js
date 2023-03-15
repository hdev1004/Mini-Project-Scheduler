import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React from "react";
import {Alert, Input} from "antd";

export default function App() {
	const [schema, setSchema] = React.useState([
		{
			id: "123",
			type: "a",
			text: "123-text"
		},
		{
			id: "345",
			type: "b",
			text: "345-text"
		},
		{
			id: "567",
			type: "a",
			text: "567-text"
		},
		{
			id: "789",
			type: "b",
			text: "789-text"
		}
	]);

	const onDragEnd = (result) => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		// reorder using index of source and destination.
		const schemaCopy = schema.slice();
		const [removed] = schemaCopy.splice(result.source.index, 1);
		// put the removed one into destination.
		schemaCopy.splice(result.destination.index, 0, removed);

		console.log(result);

		setSchema(schemaCopy);
	};
	return (
		<div className="App">
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="column1">
					{(provided, snap) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{schema.map((it, i) => (
								<Draggable
									key={it.id}
									draggableId={it.id}
									index={i}
								>
									{(provided, snap) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className="list-item"
											style={{
												backgroundColor: snap.isDragging
													? "lightblue"
													: "#eee",

												...provided.draggableProps.style
											}}
										>
                      <Input style={{width: "150px", backgroundColor: "#FFF2F0", border: "1px solid #FFCCC7"}}>
                      </Input>
											
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}
