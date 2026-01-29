import React from 'react'
import useSidebar from '../hooks/sidebarHooks'

export default function Sidebar ({structure, children}) {
	const { handleCloseSidebarView, isSidebarOpen } = useSidebar()

	return (
		<>
			{isSidebarOpen && (
				<>
					<div
						className='xl:hidden fixed inset-0 backdrop-blur-xs z-4'
						onClick={handleCloseSidebarView}
					/>
					<div className={structure}>
						{children}
					</div>
				</>
			)}
		</>
	)
}