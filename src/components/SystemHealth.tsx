import { Activity, Clock, Database, Zap } from 'lucide-react'
import React from 'react'

interface SystemHealthProps {
	data: {
		uptime: number
		latency: number
		queue_size: number
	}
}

// Circular progress component
const CircularProgress: React.FC<{
	percentage: number
	strokeColor: string
}> = ({ percentage, strokeColor }) => {
	const radius = 20
	const circumference = 2 * Math.PI * radius
	const offset = circumference - (percentage / 100) * circumference

	return (
		<svg
			className='w-14 h-14 transform -rotate-90'
			viewBox='0 0 48 48'
		>
			<circle
				cx='24'
				cy='24'
				r={radius}
				stroke='currentColor'
				strokeWidth='4'
				fill='none'
				className='text-secondary-200'
			/>
			<circle
				cx='24'
				cy='24'
				r={radius}
				stroke='currentColor'
				strokeWidth='4'
				fill='none'
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				className={`${strokeColor} transition-all duration-1000 ease-out`}
				strokeLinecap='round'
			/>
		</svg>
	)
}

const SystemHealth: React.FC<SystemHealthProps> = ({ data }) => {
	// Format uptime in appropriate units
	const formatUptime = (seconds: number): string => {
		if (seconds < 60) {
			return `${seconds}с`
		} else if (seconds < 3600) {
			return `${Math.floor(seconds / 60)}м`
		} else {
			return `${(seconds / 3600).toFixed(1)}ч`
		}
	}

	const getUptimeStatus = (uptime: number) => {
		if (uptime < 300) {
			return {
				text: 'Недавно перезапущен',
				color: 'text-orange-600',
				bgColor: 'from-orange-500 to-amber-500',
				ringColor: 'stroke-orange-500',
				percentage: 60
			}
		}
		return {
			text: 'Работает стабильно',
			color: 'text-green-600',
			bgColor: 'from-green-500 to-emerald-500',
			ringColor: 'stroke-green-500',
			percentage: 100
		}
	}

	const getLatencyStatus = (latency: number) => {
		if (latency < 200) {
			return {
				text: 'Отлично',
				color: 'text-green-600',
				bgColor: 'from-green-500 to-emerald-500',
				ringColor: 'stroke-green-500',
				percentage: 100
			}
		} else if (latency < 500) {
			return {
				text: 'Нормально',
				color: 'text-orange-600',
				bgColor: 'from-orange-500 to-amber-500',
				ringColor: 'stroke-orange-500',
				percentage: 70
			}
		}
		return {
			text: 'Высокая задержка',
			color: 'text-red-600',
			bgColor: 'from-red-500 to-rose-500',
			ringColor: 'stroke-red-500',
			percentage: 40
		}
	}

	const getQueueStatus = (size: number) => {
		if (size < 10) {
			return {
				text: 'Свободна',
				color: 'text-green-600',
				bgColor: 'from-green-500 to-emerald-500',
				ringColor: 'stroke-green-500',
				percentage: 100
			}
		} else if (size < 50) {
			return {
				text: 'Нагрузка',
				color: 'text-orange-600',
				bgColor: 'from-orange-500 to-amber-500',
				ringColor: 'stroke-orange-500',
				percentage: 60
			}
		}
		return {
			text: 'Перегрузка',
			color: 'text-red-600',
			bgColor: 'from-red-500 to-rose-500',
			ringColor: 'stroke-red-500',
			percentage: 30
		}
	}

	const uptimeStatus = getUptimeStatus(data.uptime)
	const latencyStatus = getLatencyStatus(data.latency)
	const queueStatus = getQueueStatus(data.queue_size)

	return (
		<div className='bg-gradient-to-br from-white via-blue-50/20 to-cyan-50/20 p-6 rounded-3xl shadow-soft border border-secondary-100 relative overflow-hidden'>
			{/* Decorative background */}
			<div className='absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl -z-10'></div>
			<div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-100/30 to-transparent rounded-full blur-3xl -z-10'></div>

			<div className='flex items-center gap-3 mb-6'>
				<div className='p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg'>
					<Zap className='w-5 h-5 text-white' />
				</div>
				<h3 className='text-xl font-black text-secondary-900 tracking-tight'>
					Состояние системы
				</h3>
			</div>

			<div className='space-y-3'>
				{/* Uptime */}
				<div className='group relative bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-secondary-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<div className='relative'>
								<CircularProgress
									percentage={uptimeStatus.percentage}
									strokeColor={uptimeStatus.ringColor}
								/>
								<div
									className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${uptimeStatus.bgColor} rounded-full m-2 shadow-md`}
								>
									<Activity className='w-5 h-5 text-white' />
								</div>
							</div>
							<div>
								<p className='text-sm font-bold text-secondary-900'>Аптайм</p>
								<p className='text-xs text-secondary-500 font-medium'>
									Время работы
								</p>
							</div>
						</div>
						<div className='text-right'>
							<p className='text-xl font-black text-secondary-900'>
								{data.uptime ? formatUptime(data.uptime) : 'N/A'}
							</p>
							<div className='flex items-center gap-1.5 justify-end mt-1'>
								<div
									className={`w-2 h-2 rounded-full ${uptimeStatus.color.replace(
										'text-',
										'bg-'
									)} animate-pulse`}
								></div>
								<p
									className={`text-xs font-bold uppercase tracking-wide ${uptimeStatus.color}`}
								>
									{uptimeStatus.text}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Latency */}
				<div className='group relative bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-secondary-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<div className='relative'>
								<CircularProgress
									percentage={latencyStatus.percentage}
									strokeColor={latencyStatus.ringColor}
								/>
								<div
									className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${latencyStatus.bgColor} rounded-full m-2 shadow-md`}
								>
									<Clock className='w-5 h-5 text-white' />
								</div>
							</div>
							<div>
								<p className='text-sm font-bold text-secondary-900'>Задержка</p>
								<p className='text-xs text-secondary-500 font-medium'>
									Среднее время ответа
								</p>
							</div>
						</div>
						<div className='text-right'>
							<p className='text-xl font-black text-secondary-900'>
								{data.latency}{' '}
								<span className='text-sm font-medium text-secondary-500'>
									мс
								</span>
							</p>
							<div className='flex items-center gap-1.5 justify-end mt-1'>
								<div
									className={`w-2 h-2 rounded-full ${latencyStatus.color.replace(
										'text-',
										'bg-'
									)} animate-pulse`}
								></div>
								<p
									className={`text-xs font-bold uppercase tracking-wide ${latencyStatus.color}`}
								>
									{latencyStatus.text}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Queue */}
				<div className='group relative bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-secondary-100 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<div className='relative'>
								<CircularProgress
									percentage={queueStatus.percentage}
									strokeColor={queueStatus.ringColor}
								/>
								<div
									className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${queueStatus.bgColor} rounded-full m-2 shadow-md`}
								>
									<Database className='w-5 h-5 text-white' />
								</div>
							</div>
							<div>
								<p className='text-sm font-bold text-secondary-900'>Очередь</p>
								<p className='text-xs text-secondary-500 font-medium'>
									Задачи в ожидании
								</p>
							</div>
						</div>
						<div className='text-right'>
							<p className='text-xl font-black text-secondary-900'>
								{data.queue_size}{' '}
								<span className='text-sm font-medium text-secondary-500'>
									задач
								</span>
							</p>
							<div className='flex items-center gap-1.5 justify-end mt-1'>
								<div
									className={`w-2 h-2 rounded-full ${queueStatus.color.replace(
										'text-',
										'bg-'
									)} animate-pulse`}
								></div>
								<p
									className={`text-xs font-bold uppercase tracking-wide ${queueStatus.color}`}
								>
									{queueStatus.text}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SystemHealth
