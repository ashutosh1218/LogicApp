import React from "react";
import { useDrag } from "react-dnd";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
export default function Card(props) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        item: { id: props.id, num: props.num, type: props.type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <div
            // onClick={props.addDiv(props.id, props.type)}
            ref={props.drag && drag}
            className={props.name}
            draggable={props.drag}
            style={{ border: isDragging ? "5px solid pink" : "0px" }}
        >
            <p>{props.num}</p>
            <span className="deleteBtn">
                {props.display && <button onClick={() => {
                    props.onCheck(props.id, props.type);
                }
                }><DeleteIcon /></button>}
            </span>
            {props.name==="comparater" && <button onClick={() => {
                    props.addDiv(props.id, props.type)
                }
                }><AddIcon/>Double Click</button>}
            {/* onClick={props.addDiv(props.id, props.type)} */}
        </div>
    )
}
