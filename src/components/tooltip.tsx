'use client';

import Image from 'next/image';

type TooltipProps = {
	x: number;
	y: number;
};

export function Tooltip({ x, y }: TooltipProps) {
	return (
		<div
			className='fixed z-50 flex items-center gap-2.5 px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-500 pointer-events-none text-sm shadow-md'
			style={{ top: y + 12, left: x + 12 }}
		>
			<Image
				src='/img/icons/thumbtack.svg'
				alt='Pin tab'
				width={16}
				height={16}
			/>
			<span>Unpinned Tab</span>
		</div>
	);
}
