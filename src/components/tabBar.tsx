'use client';

import { TabType } from '@/lib/tabs';
import {
	horizontalListSortingStrategy,
	SortableContext,
} from '@dnd-kit/sortable';
import clsx from 'clsx';
import { ChevronUp } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Tab from './tab';
import TabOverflowMenu from './tabOverflowMenu';

type TabBarProps = {
	tabs: TabType[];
};

export default function TabBar({ tabs }: TabBarProps) {
	const [visibleTabs, setVisibleTabs] = useState<TabType[]>([]);
	const [hiddenTabs, setHiddenTabs] = useState<TabType[]>([]);
	const [activeTabId, setActiveTabId] = useState<string>('');
	const [isActiveMenu, setIsActiveMenu] = useState(false);

	const tabBarRef = useRef<HTMLDivElement>(null);
	const tabWidthCache = useRef<Record<string, number>>({});

	const measureTabWidth = useCallback((tab: TabType): number => {
		if (tabWidthCache.current[tab.id]) return tabWidthCache.current[tab.id];

		const tempElement = document.createElement('div');
		tempElement.style.visibility = 'hidden';
		tempElement.style.position = 'absolute';
		tempElement.style.whiteSpace = 'nowrap';
		tempElement.className = 'flex items-center gap-2.5 py-2.5 px-4 text-lg';

		const paddingWidth = 20;

		tempElement.textContent = tab.title;
		document.body.appendChild(tempElement);

		const textWidth = tempElement.offsetWidth;
		document.body.removeChild(tempElement);

		const totalWidth = textWidth + paddingWidth;
		tabWidthCache.current[tab.id] = totalWidth;

		return totalWidth;
	}, []);

	const calculateVisibleTabs = useCallback(() => {
		if (!tabBarRef.current || tabs.length === 0) return;

		const containerWidth = tabBarRef.current.offsetWidth;
		const controlsWidth = 80;
		const availableWidth = containerWidth - controlsWidth;

		const visible: TabType[] = [];
		const hidden: TabType[] = [];
		let usedWidth = 0;

		const sortedTabs = [...tabs].sort((a, b) => {
			if (a.pinned && !b.pinned) return -1;
			if (!a.pinned && b.pinned) return 1;
			return 0;
		});

		sortedTabs.forEach(tab => {
			const tabWidth = measureTabWidth(tab);

			if (usedWidth + tabWidth <= availableWidth) {
				visible.push(tab);
				usedWidth += tabWidth;
			} else {
				hidden.push(tab);
			}
		});

		setVisibleTabs(visible);
		setHiddenTabs(hidden);
	}, [tabs, measureTabWidth]);

	useEffect(() => {
		if (tabs.length > 0 && !activeTabId) {
			setActiveTabId(tabs[0].id);
		}
	}, [tabs, activeTabId]);

	useEffect(() => {
		tabWidthCache.current = {}; // invalidate cache
		calculateVisibleTabs();
	}, [tabs, calculateVisibleTabs]);

	useEffect(() => {
		const handleResize = () => {
			calculateVisibleTabs();
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [calculateVisibleTabs]);

	useEffect(() => {
		if (activeTabId && tabs.length > 0) {
			const tabExists = tabs.some(tab => tab.id === activeTabId);
			if (!tabExists) {
				setActiveTabId(tabs[0].id);
			}
		}
	}, [tabs, activeTabId]);

	const handleTabClick = (tabId: string) => {
		setActiveTabId(tabId);
	};

	return (
		<div
			ref={tabBarRef}
			className='relative w-full max-w-screen border-t border-b border-[var(--color-gray-light)] flex items-center'
		>
			<SortableContext
				items={visibleTabs}
				strategy={horizontalListSortingStrategy}
			>
				<div className='flex flex-1'>
					{visibleTabs.map((tab, i) => {
						const isActive = activeTabId === tab.id;

						return (
							<div
								key={tab.id}
								className='flex flex-shrink-0 items-center'
								onClick={() => handleTabClick(tab.id)}
							>
								<Tab props={tab} isActive={isActive} />
								{visibleTabs.length - 1 > i && (
									<div className='h-4 w-[1px] bg-[var(--color-gray-light)]'></div>
								)}
							</div>
						);
					})}
				</div>

				{isActiveMenu && <TabOverflowMenu tabs={hiddenTabs} />}
			</SortableContext>

			<button
				onClick={() => setIsActiveMenu(prev => !prev)}
				className={clsx(
					'w-9 h-12 flex items-center justify-center mr-2',
					isActiveMenu && 'bg-[var(--color-blue)]'
				)}
			>
				<ChevronUp
					className={clsx(
						'transition-transform duration-300',
						isActiveMenu && 'rotate-180 text-white'
					)}
				/>
			</button>
		</div>
	);
}
