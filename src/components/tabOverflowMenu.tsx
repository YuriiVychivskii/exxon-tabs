import { TabType } from '@/lib/tabs';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import OverflowTab from './overflowTab';

export default function TabOverflowMenu({ tabs }: { tabs: TabType[] }) {
	return (
		<div className='absolute w-[225px] z-50 right-0 bg-white border top-12 flex flex-col rounded-sm border-[var(--color-gray-light)]'>
			<SortableContext items={tabs} strategy={verticalListSortingStrategy}>
				{tabs.map((tab, i) => (
					<div key={tab.id}>
						<OverflowTab props={tab} />
						<div className='flex flex-col items-center'>
							{tabs.length - 1 > i && (
								<div className='w-[195px] h-[1px] bg-[var(--color-gray-light)]'></div>
							)}
						</div>
					</div>
				))}
			</SortableContext>
		</div>
	);
}
