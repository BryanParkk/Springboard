import styles from "./App.module.css";

import SpacecraftBuilder from "./components/SpacecraftBuilder.jsx";

function App ()
{
	return (
		<div className={styles.mainContainer}>
			<SpacecraftBuilder />
		</div>
	);
}

export default App;
