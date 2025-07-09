import { TabType } from '@/lib/tabs';
import Image from 'next/image';

export default function OverflowTab({ props }: { props: TabType }) {
	return (
		<div className='flex items-center gap-2.5 py-2.5 px-4 select-none text-[var(--color-gray-medium)]'>
			<Image src={props.icon} alt={props.title} width={16} height={16} />
			<div className='text-lg'>{props.title}</div>
		</div>
	);
}
