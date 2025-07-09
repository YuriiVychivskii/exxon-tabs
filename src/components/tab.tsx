'use client';

import { TabType } from '@/lib/tabs';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { Tooltip } from './tooltip'; // окремий файл

type TabProps = {
	props: TabType;
	isActive?: boolean;
};

export default function Tab({ props, isActive }: TabProps) {
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const styles = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		setMousePosition({ x: e.clientX, y: e.clientY });
	};

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={styles}
			onMouseEnter={() => setIsTooltipVisible(true)}
			onMouseLeave={() => setIsTooltipVisible(false)}
			onMouseMove={handleMouseMove}
			className={clsx(
				'relative cursor-pointer flex items-center gap-2.5 py-2.5 px-4 select-none',
				isActive
					? 'bg-[var(--color-gray-light)] text-black'
					: 'text-[var(--color-gray-medium)]',
				'hover:bg-[var(--color-gray-light)]'
			)}
		>
			{isActive && (
				<div className='absolute top-0 left-0 w-full h-[2px] bg-[var(--color-blue)] rounded-t-md' />
			)}

			<Image src={props.icon} alt={props.title} width={16} height={16} />
			<div className='text-lg'>{props.title}</div>

			{isTooltipVisible && !props.pinned && (
				<Tooltip x={mousePosition.x} y={mousePosition.y} />
			)}
		</div>
	);
}
