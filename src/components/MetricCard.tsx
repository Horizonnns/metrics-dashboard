import clsx from 'clsx'
import { ArrowUpRight, type LucideIcon, TrendingDown } from 'lucide-react'
import React from 'react'

interface MetricCardProps {
	title: string
	value: string | number
	icon: LucideIcon
	trend?: {
		value: string | number
		label: string
		isPositive: boolean
		inverse?: boolean // If true, positive is bad (e.g. errors)
	}
	color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'indigo'
}

const MetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	icon: Icon,
	trend,
	color
}) => {
	const colorConfig = {
		blue: {
			gradient: 'from-blue-500 to-cyan-500',
			lightBg: 'from-blue-50/50 to-cyan-50/30',
			iconBg: 'bg-blue-100',
			iconText: 'text-blue-600',
			ring: 'ring-blue-200',
			glow: 'from-blue-100/40'
		},
		green: {
			gradient: 'from-green-500 to-emerald-500',
			lightBg: 'from-green-50/50 to-emerald-50/30',
			iconBg: 'bg-green-100',
			iconText: 'text-green-600',
			ring: 'ring-green-200',
			glow: 'from-green-100/40'
		},
		orange: {
			gradient: 'from-orange-500 to-amber-500',
			lightBg: 'from-orange-50/50 to-amber-50/30',
			iconBg: 'bg-orange-100',
			iconText: 'text-orange-600',
			ring: 'ring-orange-200',
			glow: 'from-orange-100/40'
		},
		red: {
			gradient: 'from-red-500 to-rose-500',
			lightBg: 'from-red-50/50 to-rose-50/30',
			iconBg: 'bg-red-100',
			iconText: 'text-red-600',
			ring: 'ring-red-200',
			glow: 'from-red-100/40'
		},
		purple: {
			gradient: 'from-purple-500 to-indigo-500',
			lightBg: 'from-purple-50/50 to-indigo-50/30',
			iconBg: 'bg-purple-100',
			iconText: 'text-purple-600',
			ring: 'ring-purple-200',
			glow: 'from-purple-100/40'
		},
		indigo: {
			gradient: 'from-indigo-500 to-blue-600',
			lightBg: 'from-indigo-50/50 to-blue-50/30',
			iconBg: 'bg-indigo-100',
			iconText: 'text-indigo-600',
			ring: 'ring-indigo-200',
			glow: 'from-indigo-100/40'
		}
	}

	const config = colorConfig[color]

	return (
		<div
			className={`relative bg-gradient-to-br ${config.lightBg} p-6 rounded-3xl shadow-soft hover:shadow-xl transition-all duration-300 border border-secondary-100 group overflow-hidden`}
		>
			{/* Decorative gradient blob */}
			<div
				className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${config.glow} to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
			></div>

			{/* Animated border glow on hover */}
			<div
				className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ${config.ring}`}
			></div>

			<div className='relative z-10'>
				<div className='flex items-start justify-between mb-4'>
					<div className='relative'>
						{/* Icon with gradient background */}
						<div
							className={`p-3.5 bg-gradient-to-br ${config.gradient} rounded-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
						>
							<Icon className='w-6 h-6 text-white' />
						</div>
						{/* Pulse effect */}
						<div
							className={`absolute inset-0 bg-gradient-to-br ${config.gradient} rounded-2xl animate-ping opacity-20`}
						></div>
					</div>

					{trend && (
						<div className='flex flex-col items-end gap-2'>
							<div
								className={clsx(
									'flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm backdrop-blur-sm',
									(trend.isPositive && !trend.inverse) ||
										(!trend.isPositive && trend.inverse)
										? 'bg-green-100/80 text-green-700 ring-1 ring-green-200'
										: 'bg-red-100/80 text-red-700 ring-1 ring-red-200'
								)}
							>
								{trend.isPositive ? (
									<ArrowUpRight className='w-3.5 h-3.5' />
								) : (
									<TrendingDown className='w-3.5 h-3.5' />
								)}
								<span>{trend.value}</span>
							</div>
						</div>
					)}
				</div>

				<div>
					<h3 className='text-secondary-600 text-xs sm:text-sm font-semibold mb-2 tracking-wide uppercase'>
						{title}
					</h3>
					<div className='flex items-baseline gap-2 mb-3'>
						<div className='text-2xl sm:text-4xl font-black text-secondary-900 tracking-tight group-hover:scale-105 transition-all duration-300'>
							{value}
						</div>
					</div>

					{trend && (
						<div className='flex items-center gap-2'>
							<div className='flex-1 h-1.5 bg-secondary-200 rounded-full overflow-hidden'>
								<div
									className={`h-full bg-gradient-to-r ${config.gradient} rounded-full transition-all duration-1000 ease-out`}
									style={{ width: '75%' }}
								></div>
							</div>
							<div className='text-xs text-secondary-500 font-semibold whitespace-nowrap'>
								{trend.label}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default MetricCard
