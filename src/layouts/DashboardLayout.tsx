import clsx from 'clsx'
import { Bot, Menu, MoreVertical, Plus, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import AddBotModal from '../components/AddBotModal'
import { removeBot, selectBot } from '../store/botsSlice'
import type { AppDispatch, RootState } from '../store/store'

interface SidebarContentProps {
	bots: { id: string; name: string }[]
	selectedBotId: string | null
	dispatch: AppDispatch
	setIsModalOpen: (isOpen: boolean) => void
	setIsMobileMenuOpen: (isOpen: boolean) => void
}

const SidebarContent: React.FC<SidebarContentProps> = ({
	bots,
	selectedBotId,
	dispatch,
	setIsModalOpen,
	setIsMobileMenuOpen
}) => {
	return (
		<div className='flex flex-col h-full bg-gradient-to-b from-white to-secondary-50/50 border-r border-secondary-200 relative overflow-hidden'>
			{/* Decorative gradient blob */}
			<div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100/30 to-transparent rounded-full blur-3xl -z-10'></div>

			{/* Header */}
			<div className='p-6 relative'>
				<div className='flex items-center gap-3 mb-2'>
					<div className='relative'>
						<div className='w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg'>
							<Bot className='w-7 h-7 text-white' />
						</div>
						<div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
					</div>
					<div>
						<h1 className='text-2xl font-black text-secondary-900 tracking-tight'>
							GigaMetrics
						</h1>
						<p className='text-xs text-secondary-500 font-semibold'>
							Analytics Dashboard
						</p>
					</div>
				</div>
			</div>

			{/* Bots Section */}
			<div className='flex-1 overflow-y-auto px-4 py-2 space-y-6 custom-scrollbar'>
				<div>
					<div className='flex items-center justify-between mb-4 px-2'>
						<div className='flex items-center gap-2'>
							<div className='text-xs font-bold text-secondary-600 uppercase tracking-wider'>
								Ваши Боты
							</div>
							<div className='px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full'>
								{bots.length}
							</div>
						</div>
						<button
							onClick={() => setIsModalOpen(true)}
							className='group relative p-2 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300'
							title='Добавить бота'
						>
							<Plus className='w-4 h-4' />
							<div className='absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
						</button>
					</div>

					<div className='space-y-2'>
						{bots.map((bot, index) => (
							<div
								key={bot.id}
								className={clsx(
									'group relative px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 border overflow-hidden',
									selectedBotId === bot.id
										? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-md'
										: 'bg-white/60 backdrop-blur-sm border-secondary-100 hover:border-green-200 hover:shadow-md hover:scale-[1.02]'
								)}
								onClick={() => {
									dispatch(selectBot(bot.id))
									setIsMobileMenuOpen(false)
								}}
								style={{ animationDelay: `${index * 0.05}s` }}
							>
								{/* Gradient overlay on hover */}
								{selectedBotId !== bot.id && (
									<div className='absolute inset-0 bg-gradient-to-r from-green-50/50 to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl'></div>
								)}

								<div className='relative flex items-center justify-between'>
									<div className='flex items-center gap-3 overflow-hidden flex-1'>
										<div className='relative'>
											<div
												className={clsx(
													'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300',
													selectedBotId === bot.id
														? 'bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg'
														: 'bg-secondary-100 group-hover:bg-gradient-to-br group-hover:from-green-400 group-hover:to-emerald-400'
												)}
											>
												<Bot
													className={clsx(
														'w-5 h-5 transition-colors',
														selectedBotId === bot.id
															? 'text-white'
															: 'text-secondary-500 group-hover:text-white'
													)}
												/>
											</div>
											{selectedBotId === bot.id && (
												<div className='absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse'></div>
											)}
										</div>
										<div className='flex-1 min-w-0'>
											<span
												className={clsx(
													'font-bold text-sm truncate block',
													selectedBotId === bot.id
														? 'text-secondary-900'
														: 'text-secondary-700 group-hover:text-secondary-900'
												)}
											>
												{bot.name}
											</span>
											<span className='text-xs text-secondary-500 font-medium'>
												{selectedBotId === bot.id
													? 'Активен'
													: 'Готов к работе'}
											</span>
										</div>
									</div>
									<button
										onClick={e => {
											e.stopPropagation()
											if (
												confirm('Вы уверены, что хотите удалить этого бота?')
											) {
												dispatch(removeBot(bot.id))
											}
										}}
										className='p-2 text-secondary-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200'
									>
										<Trash2 className='w-4 h-4' />
									</button>
								</div>
							</div>
						))}

						{bots.length === 0 && (
							<div
								onClick={() => setIsModalOpen(true)}
								className='group relative px-4 py-10 text-center border-2 border-dashed border-secondary-200 rounded-2xl text-secondary-400 hover:border-green-300 hover:bg-gradient-to-br hover:from-green-50/50 hover:to-emerald-50/30 transition-all cursor-pointer overflow-hidden'
							>
								<div className='absolute inset-0 bg-gradient-to-br from-green-100/20 to-emerald-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
								<div className='relative'>
									<div className='w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
										<Plus className='w-6 h-6 text-green-600' />
									</div>
									<span className='text-sm font-bold text-secondary-600 group-hover:text-green-700'>
										Добавить первого бота
									</span>
									<p className='text-xs text-secondary-500 mt-1'>
										Начните отслеживать метрики
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* User Profile Section */}
			<div className='p-4 border-t border-secondary-200 bg-white/80 backdrop-blur-sm'>
				<div className='relative group px-4 py-3 rounded-2xl bg-gradient-to-r from-secondary-50 to-secondary-100/50 hover:from-green-50 hover:to-emerald-50 transition-all duration-300 cursor-pointer overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-r from-green-100/20 to-emerald-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
					<div className='relative flex items-center gap-3'>
						<div className='relative'>
							<div className='w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md'>
								A
							</div>
							<div className='absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white'></div>
						</div>
						<div className='flex-1 min-w-0'>
							<p className='text-sm font-bold text-secondary-900 truncate'>
								Администратор
							</p>
							<p className='text-xs text-secondary-500 truncate font-medium'>
								admin@gigachat.ru
							</p>
						</div>
						<MoreVertical className='w-4 h-4 text-secondary-400 group-hover:text-secondary-600 transition-colors' />
					</div>
				</div>
			</div>

			<style
				dangerouslySetInnerHTML={{
					__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #047857);
        }
      `
				}}
			/>
		</div>
	)
}

const DashboardLayout: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const { bots, selectedBotId } = useSelector((state: RootState) => state.bots)
	const dispatch = useDispatch()

	const selectedBot = bots.find(b => b.id === selectedBotId)

	return (
		<div className='flex h-screen bg-background font-sans text-secondary-900'>
			{/* Desktop Sidebar */}
			<aside className='hidden md:block w-72 h-full shrink-0'>
				<SidebarContent
					bots={bots}
					selectedBotId={selectedBotId}
					dispatch={dispatch}
					setIsModalOpen={setIsModalOpen}
					setIsMobileMenuOpen={setIsMobileMenuOpen}
				/>
			</aside>

			{/* Mobile Sidebar (Drawer) */}
			<div
				className={clsx(
					'fixed inset-0 z-50 md:hidden transition-opacity duration-300',
					isMobileMenuOpen
						? 'opacity-100 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				)}
				aria-hidden={!isMobileMenuOpen}
			>
				<div
					className={clsx(
						'absolute inset-0 bg-secondary-900/20 backdrop-blur-sm transition-opacity duration-300',
						isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
					)}
					onClick={() => setIsMobileMenuOpen(false)}
				/>
				<div
					className={clsx(
						'absolute left-0 top-0 bottom-0 w-72 bg-surface shadow-2xl transform transition-transform duration-300 ease-in-out',
						isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
					)}
				>
					<SidebarContent
						bots={bots}
						selectedBotId={selectedBotId}
						dispatch={dispatch}
						setIsModalOpen={setIsModalOpen}
						setIsMobileMenuOpen={setIsMobileMenuOpen}
					/>
					<button
						onClick={() => setIsMobileMenuOpen(false)}
						className='absolute top-4 right-4 p-2 text-secondary-400 hover:text-secondary-900'
					>
						<X className='w-6 h-6' />
					</button>
				</div>
			</div>

			{/* Main Content */}
			<main className='flex-1 flex flex-col min-w-0 overflow-hidden'>
				{/* Mobile Header */}
				<header className='md:hidden flex items-center justify-between p-4 bg-surface border-b border-secondary-200'>
					<div className='flex items-center gap-3'>
						<button
							onClick={() => setIsMobileMenuOpen(true)}
							className='p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg'
						>
							<Menu className='w-6 h-6' />
						</button>
						<span className='font-bold text-lg text-secondary-900'>
							GigaMetrics
						</span>
					</div>
				</header>

				{/* Desktop Header & Content */}
				<div className='flex-1 overflow-auto'>
					<div className='w-full p-4 md:p-8'>
						<header className='mb-8 hidden md:block'>
							<div className='flex items-center justify-between'>
								<div>
									<h2 className='text-3xl font-bold text-secondary-900 tracking-tight mb-1'>
										{selectedBot ? selectedBot.name : ''}
									</h2>
									<p className='text-secondary-500'>
										{selectedBot ? 'Онлайн мониторинг метрик' : ''}
									</p>
								</div>
								{selectedBot && (
									<div className='flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium'>
										<div className='w-2 h-2 bg-primary-500 rounded-full animate-pulse' />
										Активен
									</div>
								)}
							</div>
						</header>

						<Outlet />
					</div>
				</div>
			</main>

			<AddBotModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	)
}

export default DashboardLayout
