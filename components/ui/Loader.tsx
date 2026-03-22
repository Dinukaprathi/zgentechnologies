export default function Loader() {
	return (
		<div className="flex items-center justify-center">
			<div className="relative h-16 w-16 lg:h-20 lg:w-20">
				<div className="absolute inset-0 animate-spin">
					<img
						src="/logo/logo-without-bg.png"
						alt="Loading"
						className="h-full w-full object-contain"
					/>
				</div>
			</div>
		</div>
	);
}
