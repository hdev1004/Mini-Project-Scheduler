import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React from "react";
import "../../css/contents/cards.css";
import {Alert, Input, Result} from "antd";
import { calendarState } from "../../recoil/state";
import { useRecoilState } from "recoil";
import {CloseOutlined, DeleteTwoTone, LineHeightOutlined} from '@ant-design/icons';
const App = ({today}) => {
	const backgroundColors = ["", "#FFF2F0", "#FFFBE6", "#DFF4FF"];
	const borderColors = ["", "#FFCCC7", "#FFE58F", "#91CAFF"];

    const [calendarStateValue, calendarStateSet] = useRecoilState(calendarState);

	const onChange = (e, it, i) => {
		let tempCalendar = [...calendarStateValue[today]];
		let tempJson = {...tempCalendar[i]};

		tempJson.des = e.target.value;
		tempCalendar[i] = tempJson;
		console.log("Temp : ", tempCalendar);
		
		calendarStateSet({...calendarStateValue, [today]: tempCalendar});
	}

	const onDelete = (it, i) => {
		console.log(it, today, i);
		let tempCalendar = [...calendarStateValue[today]];
		tempCalendar.splice(i, 1);

		calendarStateSet({...calendarStateValue, [today]: tempCalendar});

	}

	const onDragEnd = (result) => {
		console.log(result);
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		// reorder using index of source and destination.
		const schemaCopy = calendarStateValue[today].slice();
		const [removed] = schemaCopy.splice(result.source.index, 1);
		// put the removed one into destination.
		schemaCopy.splice(result.destination.index, 0, removed);

		calendarStateSet({...calendarStateValue, [today]: schemaCopy});
	};
	return (
		<div className="App">
			<DragDropContext onDragEnd={onDragEnd} >
				<Droppable droppableId="column1" >
					{(provided, snap) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{calendarStateValue[today].map((it, i) => (
								<Draggable
									key={it.num}
									draggableId={it.des}
									index={i}
								>
									{(provided, snap) => (
										<div style={{position: "relative"}}>
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className="list-item"
											style={{
												
												backgroundColor: snap.isDragging
													? "#DDDDDD"
													: "#F5F5F5",

												...provided.draggableProps.style
											}}
										>
										<Input key="editor1" style={{width: "85%", height:"40px", backgroundColor: backgroundColors[it.important], border: "1px solid " + borderColors[it.important], fontWeight: "bold", fontFamily: "나눔"}} value={it.des}  
											onChange={(e) => {onChange(e, it, i)}}></Input>
											<DeleteTwoTone onClick={() => {onDelete(it, i)}} twoToneColor="#eb2f96" style={{fontSize: "20px", position: "absolute", marginLeft: "55px", lineHeight: "50px"}}/>
										</div>
										
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

export default App;