import {
	Activity,
	AlertTriangle,
	CreditCard,
	Loader2,
	Sparkles,
	Users
} from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import MetricCard from '../components/MetricCard'
import PaymentsList from '../components/PaymentsList'
import SystemHealth from '../components/SystemHealth'
import ToneDistribution from '../components/ToneDistribution'
import UsageChart from '../components/UsageChartLine'
import { useGetMetricsQuery } from '../store/metricsApi'
import type { RootState } from '../store/store'

// Type for payment history day data
interface PaymentDayData {
	count: number
	totalAmount: number
}

const DashboardPage: React.FC = () => {
	const { bots, selectedBotId } = useSelector((state: RootState) => state.bots)
	const selectedBot = bots.find(b => b.id === selectedBotId)

	const { data, error, isLoading, refetch } = useGetMetricsQuery(
		{ url: selectedBot?.url || '', key: selectedBot?.secretKey || '' },
		{
			skip: !selectedBot,
			pollingInterval: 30000 // Poll every 30 seconds
		}
	)

	if (!selectedBot) {
		return null // Should be handled by layout/welcome page
	}

	if (isLoading) {
		return (
			<div className='flex flex-col items-center justify-center h-[60vh]'>
				<Loader2 className='w-10 h-10 text-primary-500 animate-spin mb-4' />
				<p className='text-gray-500 font-medium'>Загрузка метрик...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex flex-col items-center justify-center h-[60vh] text-center'>
				<div className='bg-red-50 p-4 rounded-full mb-4'>
					<AlertTriangle className='w-10 h-10 text-red-500' />
				</div>
				<h3 className='text-lg font-bold text-gray-900 mb-2'>
					Не удалось загрузить метрики
				</h3>
				<p className='text-gray-500 max-w-md mb-6'>
					Мы не смогли подключиться к вашему боту. Пожалуйста, проверьте URL и
					секретный ключ в настройках бота.
				</p>
				<button
					onClick={() => refetch()}
					className='px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm'
				>
					Попробовать снова
				</button>
			</div>
		)
	}

	const metrics = data || {
		users: {
			total: 0,
			active_today: 0,
			active_7d: 0,
			active_30d: 0,
			premium: 0
		},
		usage: {
			total_rewrites: 0,
			rewrites_today: 0,
			rewrites_by_day: {},
			tones: {}
		},
		payments: { total_payments: 0, new_payments_24h: 0, history_30d: {} },
		errors: { total_errors: 0, errors_today: 0 },
		system: { queue_length: 0, latency_avg_ms: 0, uptime_seconds: 0 }
	}

	const usersTotal = metrics.users?.total ?? 0

	// API response shown: total, active_today, active_7d, active_30d, premium. NO new_today.
	// We'll use active_today as a proxy for now or 0 if strictly new.
	const usersActiveToday = metrics.users?.active_today ?? 0

	const rewritesTotal = metrics.usage?.total_rewrites ?? 0
	const rewritesToday = metrics.usage?.rewrites_today ?? 0

	// Wait, API has "total_payments": 1. This looks like count.
	// "history_30d" has "totalAmount".
	// We might need to sum up history_30d to get total revenue if the API doesn't provide it directly.
	// Or maybe "total_payments" IS the revenue? No, usually it's count.
	// Let's assume for now we display what we have.

	// Calculate total revenue from history if possible, or just show total payments count
	const totalRevenue = Object.values(
		(metrics.payments?.history_30d || {}) as Record<string, PaymentDayData>
	).reduce(
		(acc: number, day: PaymentDayData) => acc + (day.totalAmount || 0),
		0
	)

	const errorsTotal = metrics.errors?.total_errors ?? 0
	const errorsToday = metrics.errors?.errors_today ?? 0

	return (
		<div className='space-y-6 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500'>
			{/* Top Cards - Metrics */}
			<div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6'>
				<MetricCard
					title='Всего пользователей'
					value={usersTotal.toLocaleString()}
					icon={Users}
					trend={{
						value: usersActiveToday,
						label: 'общее количество',
						isPositive: true
					}}
					color='blue'
				/>
				<MetricCard
					title='Рерайтов (сегодня)'
					value={rewritesToday.toLocaleString()}
					icon={Activity}
					trend={{ value: rewritesToday, label: 'сегодня', isPositive: true }}
					color='orange'
				/>
				<MetricCard
					title='Всего рерайтов'
					value={rewritesTotal.toLocaleString()}
					icon={Sparkles}
					trend={{
						value: rewritesToday,
						label: 'всплеск сегодня',
						isPositive: true
					}}
					color='purple'
				/>
				<MetricCard
					title='Выручка (30д)'
					value={`₽${totalRevenue.toLocaleString()}`}
					icon={CreditCard}
					trend={{
						value: metrics.payments?.new_payments_24h ?? 0,
						label: 'платежей за 24ч',
						isPositive: true
					}}
					color='green'
				/>
				<MetricCard
					title='Ошибки'
					value={errorsTotal.toLocaleString()}
					icon={AlertTriangle}
					trend={{
						value: errorsToday,
						label: 'сегодня',
						isPositive: false,
						inverse: true // Red is bad for errors
					}}
					color='red'
				/>
			</div>

			{/* Main Content - Bento Grid */}
			<div className='grid grid-cols-12 gap-6 items-start'>
				{/* Bottom Row of Left Column */}
				<div className='col-span-12 xl:col-span-6'>
					<SystemHealth
						data={{
							uptime: metrics.system?.uptime_seconds ?? 0,
							latency: metrics.system?.latency_avg_ms ?? 0,
							queue_size: metrics.system?.queue_length ?? 0
						}}
					/>
				</div>

				{/* Right Column (Payments) - Spans 4 columns */}
				<div className='col-span-12 xl:col-span-6'>
					<PaymentsList data={metrics.payments?.history_30d ?? {}} />
				</div>
			</div>

			<div className='grid grid-cols-12 gap-6 items-start'>
				{/* Usage Chart - Top of left column, full width (8 cols relative to page, 12 relative to parent) */}
				<div className='col-span-12 xl:col-span-6 h-full'>
					<UsageChart data={metrics.usage?.rewrites_by_day ?? {}} />
				</div>

				<div className='col-span-12 xl:col-span-6'>
					<ToneDistribution data={metrics.usage?.tones ?? {}} />
				</div>
			</div>
		</div>
	)
}

export default DashboardPage
