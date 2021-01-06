import React, { useState, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [task, setTask] = useState("");

	return (
		<div>
			<input
				type="text"
				className="input"
				id="in"
				value={task}
				onChange={e => setTask(e.target.value)}
				onKeyUp={e => {
					if (e.keyCode == 13) {
						actions.listAdd(task);
						setTask("");
					}
				}}
			/>

			<div />

			<ol>
				{store.list.map((item, i) => {
					return (
						<li key={i}>
							<div>{item.label}</div>
							<div>{item.done ? "Done!" : "Pending"}</div>
							<div onClick={i => actions.finish(i)}>finish task</div>
						</li>
					);
				})}
			</ol>
		</div>
	);
};
