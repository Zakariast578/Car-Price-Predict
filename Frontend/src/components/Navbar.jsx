import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Gauge, CarFront, Sparkles } from 'lucide-react';

const links = [
	{ id: 'home', label: 'Home' },
	{ id: 'about', label: 'About' },
	{ id: 'how-it-works', label: 'How It Works' },
];

const Navbar = () => {
	const [active, setActive] = useState('home');
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const NavLink = ({ id, label, onClick, mobile }) => (
		<a
			href={`#${id}`}
			onClick={() => {
				setActive(id);
				onClick && onClick();
			}}
			className={`relative px-2 py-1 text-sm font-medium transition-colors duration-300 ${
				active === id
					? 'text-primary'
					: 'text-muted-foreground hover:text-foreground'
			} ${mobile ? 'text-lg' : ''} group`}
		>
			<span>{label}</span>
			<span className="pointer-events-none absolute inset-x-0 -bottom-1 h-0.5 scale-x-0 bg-gradient-to-r from-primary/30 via-primary to-primary/30 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 rounded-full"></span>
		</a>
	);

	return (
		<header
			className={`fixed top-0 z-50 w-full backdrop-blur-md transition-all duration-300 border-b border-border/40 ${
				scrolled ? 'bg-background/80 shadow-lg' : 'bg-background/40'
			}`}
		>
			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
				{/* Logo */}
				<a
					href="#home"
					className="flex items-center gap-2"
					onClick={() => setActive('home')}
				>
					<div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center">
						<CarFront className="h-5 w-5 text-primary" />
					</div>
					<span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
						AutoValue
					</span>
				</a>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-6">
					{links.map((l) => (
						<NavLink key={l.id} {...l} />
					))}
				</nav>

				{/* CTA */}
				<div className="hidden md:flex items-center gap-3">
					<Button variant="default" className="relative overflow-hidden group">
						<span className="relative z-10 flex items-center gap-1">
							<Gauge className="h-4 w-4" /> Try Demo
						</span>
						<span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
					</Button>
				</div>

				{/* Mobile menu */}
				<div className="md:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon" className="relative overflow-hidden">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[270px] sm:w-[320px] flex flex-col">
							<div className="mt-8 flex flex-col gap-6">
								{links.map((l) => (
									<SheetClose asChild key={l.id}>
										<NavLink {...l} mobile />
									</SheetClose>
								))}
								<SheetClose asChild>
									<Button className="mt-4 flex items-center gap-2">
										<Sparkles className="h-4 w-4" /> Try Demo
									</Button>
								</SheetClose>
							</div>
							<div className="mt-auto pt-8 text-xs text-muted-foreground">
								© {new Date().getFullYear()} AutoValue
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
