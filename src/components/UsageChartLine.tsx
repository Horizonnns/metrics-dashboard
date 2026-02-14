import { Activity, TrendingUp } from 'lucide-react'
import React from 'react'
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

interface UsageChartProps {
	data: Record<string, number>
}

interface TooltipProps {
	active?: boolean
	payload?: Array<{ value: number; name: string }>
	label?: string
}

// Custom tooltip component with enhanced design
const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className='bg-gradient-to-br from-white to-secondary-50 px-5 py-4 rounded-2xl shadow-2xl border-2 border-primary-200 backdrop-blur-sm'>
				<div className='flex items-center gap-2 mb-2'>
					<div className='w-2 h-2 rounded-full bg-gradient-to-r from-[#009a5c] to-[#38e0a3] animate-pulse'></div>
					<p className='text-xs text-secondary-600 font-semibold uppercase tracking-wider'>
						{label}
					</p>
				</div>
				<div className='flex items-baseline gap-2'>
					<p className='text-2xl font-black bg-gradient-to-r from-[#009a5c] to-[#38e0a3] bg-clip-text text-transparent'>
						{payload[0].value}
					</p>
					<span className='text-sm font-medium text-secondary-500'>
						запросов
					</span>
				</div>
			</div>
		)
	}
	return null
}

const UsageChartLine: React.FC<UsageChartProps> = ({ data }) => {
	const chartData = Object.entries(data || {})
		.map(([date, count]) => ({
			date: new Date(date).toLocaleDateString('ru-RU', {
				day: 'numeric',
				month: 'short'
			}),
			count,
			originalDate: new Date(date) // for sorting
		}))
		.sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
		.slice(-7) // Last 7 days

	// Calculate stats
	const totalRequests = chartData.reduce((sum, item) => sum + item.count, 0)
	const avgRequests = Math.round(totalRequests / chartData.length)
	const maxRequests = Math.max(...chartData.map(item => item.count))

	return (
		<div className='bg-gradient-to-br from-white via-secondary-50/30 to-primary-50/20 p-6 rounded-3xl shadow-soft border border-secondary-100 relative h-full overflow-hidden'>
			{/* Decorative background elements */}
			<div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/20 to-transparent rounded-full blur-3xl -z-10'></div>
			<div className='absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-100/20 to-transparent rounded-full blur-3xl -z-10'></div>

			<div className='flex items-start justify-between mb-6'>
				<div>
					<div className='flex items-center gap-3 mb-2'>
						<div className='p-2 bg-gradient-to-br from-[#009a5c] to-[#38e0a3] rounded-xl shadow-lg'>
							<Activity className='w-5 h-5 text-white' />
						</div>
						<h3 className='text-xl font-black text-secondary-900 tracking-tight'>
							История использования
						</h3>
					</div>
					<div className='flex items-center gap-4 mt-3'>
						<div className='flex items-center gap-2'>
							<TrendingUp className='w-4 h-4 text-green-600' />
							<span className='text-sm font-bold text-secondary-700'>
								Макс: <span className='text-green-600'>{maxRequests}</span>
							</span>
						</div>
						<div className='h-4 w-px bg-secondary-200'></div>
						<span className='text-sm font-medium text-secondary-600'>
							Среднее:{' '}
							<span className='font-bold text-secondary-900'>
								{avgRequests}
							</span>
						</span>
					</div>
				</div>
				<div className='flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm border border-secondary-100'>
					<div className='w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#009a5c] to-[#38e0a3] animate-pulse'></div>
					<span className='text-xs text-secondary-600 font-semibold'>
						7 дней
					</span>
				</div>
			</div>

			<div className='h-[280px] w-full'>
				<ResponsiveContainer
					width='100%'
					height='100%'
				>
					<AreaChart
						data={chartData}
						margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
					>
						<defs>
							<linearGradient
								id='colorGradient'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='0%'
									stopColor='#009a5c'
									stopOpacity={0.4}
								/>
								<stop
									offset='50%'
									stopColor='#38e0a3'
									stopOpacity={0.2}
								/>
								<stop
									offset='100%'
									stopColor='#76eebf'
									stopOpacity={0.05}
								/>
							</linearGradient>
							<linearGradient
								id='strokeGradient'
								x1='0'
								y1='0'
								x2='1'
								y2='0'
							>
								<stop
									offset='0%'
									stopColor='#009a5c'
								/>
								<stop
									offset='100%'
									stopColor='#38e0a3'
								/>
							</linearGradient>
							<filter id='glow'>
								<feGaussianBlur
									stdDeviation='3'
									result='coloredBlur'
								/>
								<feMerge>
									<feMergeNode in='coloredBlur' />
									<feMergeNode in='SourceGraphic' />
								</feMerge>
							</filter>
						</defs>
						<CartesianGrid
							strokeDasharray='3 3'
							vertical={false}
							stroke='#e5e7eb'
							strokeOpacity={0.3}
						/>
						<XAxis
							dataKey='date'
							axisLine={false}
							tickLine={false}
							tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
							dy={10}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
							tickFormatter={value => `${value}`}
						/>
						<Tooltip
							content={<CustomTooltip />}
							cursor={{
								stroke: '#009a5c',
								strokeWidth: 2,
								strokeDasharray: '5 5',
								strokeOpacity: 0.3
							}}
						/>
						<Area
							type='monotone'
							dataKey='count'
							stroke='url(#strokeGradient)'
							strokeWidth={3}
							fill='url(#colorGradient)'
							fillOpacity={1}
							filter='url(#glow)'
							animationDuration={1500}
							animationEasing='ease-in-out'
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default UsageChartLine
