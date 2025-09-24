import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, MapPin, MousePointerClick, Sparkles, Binary, Brain, CheckCircle2 } from "lucide-react";

const steps = [
	{
		icon: <Car className="h-8 w-8 text-primary" />,
		title: "Enter Details",
		description: "Doors, accident history, age & indicators (new/best)",
		accent: "from-primary/20 via-primary/5 to-transparent"
	},
	{
		icon: <MapPin className="h-8 w-8 text-primary" />,
		title: "Set Location",
		description: "Regional encoding feeds location-sensitive pricing",
		accent: "from-emerald-300/20 via-emerald-200/10 to-transparent"
	},
	{
		icon: <Binary className="h-8 w-8 text-primary" />,
		title: "Feature Pipeline",
		description: "Cleans, imputes & clips statistical outliers",
		accent: "from-fuchsia-300/20 via-fuchsia-200/10 to-transparent"
	},
	{
		icon: <Brain className="h-8 w-8 text-primary" />,
		title: "Model Inference",
		description: "Linear & ensemble models generate valuation",
		accent: "from-indigo-300/20 via-indigo-200/10 to-transparent"
	},
	{
		icon: <MousePointerClick className="h-8 w-8 text-primary" />,
		title: "Submit",
		description: "Single request triggers dual predictions",
		accent: "from-amber-300/20 via-amber-200/10 to-transparent"
	},
	{
		icon: <Sparkles className="h-8 w-8 text-primary" />,
		title: "Results",
		description: "Side‑by‑side price comparison instantly returned",
		accent: "from-teal-300/20 via-teal-200/10 to-transparent"
	},
];

const HowItWork = () => {
	return (
		<section id="how-it-works" className="relative w-full py-16 md:py-28 bg-muted/40 overflow-hidden">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_60%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.08),transparent_60%)]" />

			<div className="container px-4 md:px-8 relative">
				<div className="flex flex-col items-center text-center space-y-4 mb-12">
					<Badge variant="outline" className="px-4 py-1 rounded-full text-xs tracking-wide backdrop-blur bg-background/60">Pipeline</Badge>
					<h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-black bg-gradient-to-r from-primary via-primary/70 to-primary">How It Works</h2>
					<p className="max-w-2xl text-muted-foreground leading-relaxed text-sm md:text-base">
						A refined valuation flow engineered for clarity, speed and reliability.
					</p>
				</div>

				<div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{steps.map((s, i) => (
						<Card
							key={i}
							className="group relative overflow-hidden border border-border/50 bg-gradient-to-br from-background/70 to-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
						>
							<div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${s.accent}`} />
							<CardHeader className="relative z-10 flex flex-row items-start justify-between gap-4 pb-3">
								<div className="p-2 rounded-lg bg-primary/10 ring-1 ring-primary/20">{s.icon}</div>
								<Badge variant="secondary" className="rounded-full text-[10px] tracking-wide">STEP {i + 1}</Badge>
							</CardHeader>
							<CardContent className="relative z-10 pt-0 space-y-2">
								<h3 className="font-semibold text-sm md:text-base tracking-tight">{s.title}</h3>
								<p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{s.description}</p>
							</CardContent>
							<div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-primary via-primary/60 to-primary" />
						</Card>
					))}
				</div>

				<div className="mt-14 flex items-center justify-center text-xs text-muted-foreground gap-2">
					<CheckCircle2 className="h-4 w-4 text-primary" /> Dual model approach improves interpretability & robustness.
				</div>
			</div>
		</section>
	);
};

export default HowItWork;
