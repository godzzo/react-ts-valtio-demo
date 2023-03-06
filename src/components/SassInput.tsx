import styles from './SassInput.module.scss';

export default function SassInput() {
	return (
		<div className={styles.container}>
			<input type="text" defaultValue={'Hello World 😃'} />
		</div>
	);
}
