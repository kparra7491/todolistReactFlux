const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			list: [],
			input: ""
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadInitialData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
                */

				fetch("https://assets.breatheco.de/apis/fake/todos/user/kparra")
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
							console.log("error after response");
						}
						return response.json();
					})
					.then(jsonifiedResponse => {
						setStore({
							list: jsonifiedResponse
						});
					})

					.catch(function(error) {
						console.log("ya broke it", error);
					});
			},
			//Get a list for a user
			//New List (if no todos)
			//update the list
			//Delete a list
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			listAdd: newTask => {
				//add 'input' to the list

				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color

				if (newTask) {
					var newListObject = { label: newTask, done: false };
					var updatedList = store.list.concat(newListObject);
					setStore({
						list: updatedList
					});

					fetch("https://assets.breatheco.de/apis/fake/todos/user/kparra", {
						method: "PUT", // or 'POST'
						body: JSON.stringify(store.list), // data can be `string` or {object}!
						headers: {
							"Content-Type": "application/json"
						}
					})
						.then(res => res.json())
						.then(response => console.log("Success:", JSON.stringify(response)))
						.catch(error => console.error("Error:", error));
				}

				//reset the global store
			},
			finish: index => {
				//get the store
				const store = getStore();
				console.log(index);
				//we have to loop the entire demo array to look for the respective index
				//and change its color

				var newList = store.list;
				var updatedList = newList.splice(index, 1);

				setStore({
					list: updatedList
				});

				fetch("https://assets.breatheco.de/apis/fake/todos/user/kparra", {
					method: "PUT", // or 'POST'
					body: JSON.stringify(store.list), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response => console.log("Success:", JSON.stringify(response)))
					.catch(error => console.error("Error:", error));
			}

			//reset the global store
		}
	};
};

export default getState;
