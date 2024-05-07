import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { useMemo } from 'react';
import { Experience } from './components/Experience.tsx';

export enum Controls {
	forward = 'forward',
	back = 'back',
	left = 'left',
	right = 'right',
	jump = 'jump',
}

function App() {
	const map = useMemo<KeyboardControlsEntry<Controls>[]>(
		() => [
			{ name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
			{ name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
			{ name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
			{ name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
			{ name: Controls.jump, keys: ['Space'] },
		],
		[]
	);

	return (
		<div className={'h-full'}>
			<KeyboardControls map={map}>
				<Experience />
			</KeyboardControls>
		</div>
	);
}

export default App;
