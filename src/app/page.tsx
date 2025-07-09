'use client';
import TabBar from '@/components/tabBar';
import { initialTabs, TabType } from '@/lib/tabs';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'tabs';

export default function Home() {
	const [tabs, setTabs] = useState<TabType[]>([]);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const stored = localStorage.getItem(STORAGE_KEY);
		setTabs(stored ? JSON.parse(stored) : [...initialTabs]);
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
		}, 300);

		return () => clearTimeout(timeout);
	}, [tabs]);

	const handleDragEnd = ({ active, over }: DragEndEvent) => {
		if (!over || active.id === over.id) return;

		setTabs(prevTabs => {
			const fromIndex = prevTabs.findIndex(tab => tab.id === active.id);
			const toIndex = prevTabs.findIndex(tab => tab.id === over.id);
			return arrayMove(prevTabs, fromIndex, toIndex);
		});
	};

	return (
		<div className='mt-10'>
			<DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
				<TabBar tabs={tabs} />
			</DndContext>
		</div>
	);
}
