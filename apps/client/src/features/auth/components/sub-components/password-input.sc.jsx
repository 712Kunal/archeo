"use client";

import { useId, useMemo, useState } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { LockKeyhole } from "lucide-react";

export default function PasswordInput({
	fieldDetails,
	handleFieldChange,
	value,
	error,
}) {
	const id = useId();
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible((prevState) => !prevState);
	const { name, label, required } = fieldDetails;

	const checkStrength = (pass) => {
		const requirements = [
			{ regex: /.{8,}/, text: "At least 8 characters" },
			{ regex: /^.{8,129}$/, text: "At max 128 characters" },
			{ regex: /[0-9]/, text: "At least 1 number" },
			{ regex: /[a-z]/, text: "At least 1 lowercase letter" },
			{ regex: /[A-Z]/, text: "At least 1 uppercase letter" },
			{ regex: /[@_]/, text: "At least one special character (@ or _)" },
		];

		return requirements.map((req) => ({
			met: req.regex.test(pass),
			text: req.text,
		}));
	};

	const strength = checkStrength(value);

	const strengthScore = useMemo(() => {
		return strength.filter((req) => req.met).length;
	}, [strength]);

	const getStrengthColor = (score) => {
		if (score === 0) return "bg-border";
		if (score <= 1) return "bg-red-500";
		if (score <= 2) return "bg-orange-500";
		if (score === 3) return "bg-amber-500";
		return "bg-emerald-500";
	};

	const getStrengthText = (score) => {
		if (score === 0) return "Enter a password";
		if (score <= 2) return "Weak password";
		if (score === 3) return "Medium password";
		return "Strong password";
	};

	return (
		<div>
			{/* Password input field with toggle visibility button */}
			<div className="*:not-first:mt-2">
				<Label htmlFor={id}>
					<LockKeyhole size={16} />
					{label}
				</Label>
				<div className="relative">
					<Input
						id={id}
						name={name}
						className="pe-9"
						placeholder="Password"
						type={isVisible ? "text" : "password"}
						value={value}
						onChange={(e) => handleFieldChange(name, e.target.value)}
						aria-describedby={`${id}-description`}
						required={required}
					/>
					<button
						className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
						type="button"
						onClick={toggleVisibility}
						aria-label={isVisible ? "Hide password" : "Show password"}
						aria-pressed={isVisible}
						aria-controls="password"
					>
						{isVisible ? (
							<EyeOffIcon size={16} aria-hidden="true" />
						) : (
							<EyeIcon size={16} aria-hidden="true" />
						)}
					</button>
				</div>
				{error && <p className="text-xs text-destructive">{error}</p>}
			</div>

			{/* Password strength indicator */}
			<div
				className="mt-3 mb-4 h-1 w-full overflow-hidden rounded-full bg-border"
				role="progressbar"
				aria-valuenow={strengthScore}
				aria-valuemin={0}
				aria-valuemax={4}
				aria-label="Password strength"
			>
				<div
					className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
					style={{ width: `${(strengthScore / 4) * 100}%` }}
				></div>
			</div>

			{/* Password strength description */}
			<p
				id={`${id}-description`}
				className="mb-2 text-sm font-medium text-foreground"
			>
				{getStrengthText(strengthScore)}. Must contain:
			</p>

			{/* Password requirements list */}
			<ul className="space-y-1.5" aria-label="Password requirements">
				{strength.map((req, index) => (
					<li key={index} className="flex items-center gap-2">
						{req.met ? (
							<CheckIcon
								size={16}
								className="text-emerald-500"
								aria-hidden="true"
							/>
						) : (
							<XIcon
								size={16}
								className="text-muted-foreground/80"
								aria-hidden="true"
							/>
						)}
						<span
							className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
						>
							{req.text}
							<span className="sr-only">
								{req.met ? " - Requirement met" : " - Requirement not met"}
							</span>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
