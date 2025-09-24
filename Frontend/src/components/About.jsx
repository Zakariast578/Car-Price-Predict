import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, Target, UserCheck, ShieldCheck, Clock3, Cpu } from "lucide-react";

const features = [
	{
		icon: <Zap className="h-8 w-8 text-primary drop-shadow" />,
		title: "Fast Predictions",
		description:
			"Get vehicle valuation results in milliseconds with optimized inference.",
		accent:
			"from-amber-200/30 via-yellow-100/10 to-transparent",
	},
	{
		icon: <Cpu className="h-8 w-8 text-primary drop-shadow" />,
		title: "ML Driven",
		description:
			"Ensembled regression models tuned for balanced accuracy & robustness.",
		accent:
			"from-sky-200/30 via-blue-100/10 to-transparent",
	},
	{
		icon: <ShieldCheck className="h-8 w-8 text-primary drop-shadow" />,
		title: "Reliable Data",
		description:
			"Outlier handling, imputation & feature engineering baked into pipeline.",
		accent:
			"from-emerald-200/30 via-green-100/10 to-transparent",
	},
	{
		icon: <Clock3 className="h-8 w-8 text-primary drop-shadow" />,
		title: "Always Ready",
		description:
			"Stateless API design with quick cold starts and minimal overhead.",
		accent:
			"from-fuchsia-200/30 via-pink-100/10 to-transparent",
	},
	{
		icon: <Target className="h-8 w-8 text-primary drop-shadow" />,
		title: "Accurate Results",
		description:
			"Validated with multiple metrics: MAE, RMSE, R² tracking.",
		accent:
			"from-indigo-200/30 via-indigo-100/10 to-transparent",
	},
	{
		icon: <UserCheck className="h-8 w-8 text-primary drop-shadow" />,
		title: "User Friendly",
		description:
			"Clean UX with instant feedback & error validation.",
		accent:
			"from-teal-200/30 via-teal-100/10 to-transparent",
	},
];

const About = () => {
	return (
		<section
			id="about"
			className="relative w-full py-16 md:py-28 bg-gradient-to-br from-background via-background to-muted/40 overflow-hidden"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.08),transparent_60%)]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(168,85,247,0.08),transparent_55%)]" />

			<div className="relative container mx-auto px-4 md:px-8">
				<div className="mx-auto max-w-3xl text-center mb-14 space-y-4">
					<h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-black bg-gradient-to-r from-primary via-primary/70 to-primary">
						Why AutoValue?
					</h2>
					<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
						A modern valuation engine combining engineered automotive features,
						statistical rigor and clean design to deliver instant & dependable
						price insights.
					</p>
				</div>

				<div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((f, i) => (
						<Card
							key={i}
							className="group relative overflow-hidden border border-border/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
						>
							<div
								className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${f.accent}`}
							/>
							<CardHeader className="relative z-10 flex flex-row items-start gap-4 pb-3">
								<div className="p-2 rounded-lg bg-primary/10 ring-1 ring-primary/20">
									{f.icon}
								</div>
								<CardTitle className="text-lg leading-tight">
									{f.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="relative z-10 pt-0">
								<p className="text-sm text-muted-foreground leading-relaxed">
									{f.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default About;
